<?php

/**
 * 2022熊猫
 * 客户端版本：V1.0
 * 日期：2022-4-26
 */
error_reporting(0);

header("Content-Type: text/html;charset=utf8");
header('Access-Control-Allow-Origin:*'); // *代表允许任何网址请求
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin');

require_once '../common/in_mysql.php';
require_once '../db/content.db.php';
require_once '../db/home.db.php';
require_once '../db/index.db.php';
require_once '../db/stat.db.php';
require_once '../db/text.db.php';
require_once '../db/word.db.php';

date_default_timezone_set("PRC");
define("SECONDS_IN_DAY", 86400);

$action = trim(filter_input(INPUT_GET, "action"));

switch ($action) {
    case 'getIndexData':    //首页数据
        $res = getIndexData();
        break;
    case 'getContentData':  //目录数据
        $res = getContentData();
        break;
    case 'getWordData':  //生词数据
        $res = getWordData();
        break;
    case 'getTextData':  //课文阅读
        $res = getTextData();
        break;
    case 'getHomeData':  //熊猫页面文字
        $res = getHomeData();
        break;
    case 'addAction':   //操作记录
        $res = addAction();
        break;
    default:
        $res['code'] = 2;
        $res['msg'] = "no action input";
}

echo json_encode($res);

function getIndexData() {
    $indexDb = new IndexDb();
    $data = $indexDb->getIndexContent();
    $res = array();
    for ($i = 0, $len = count($data); $i < $len; $i++) {
        if ($data[$i]['name'] == "language") {
            $res['language'][$data[$i]['lang']] = $data[$i]['content'];
        } else {
            $res[$data[$i]['lang']][$data[$i]['name']] = $data[$i]['content'];
        }
    }

    return $res;
}

function getContentData() {
    $mysql = new InMysql();
    $indexDb = new IndexDb($mysql);
    $data = $indexDb->getIndexContent();
    $res = array();
    for ($i = 0, $len = count($data); $i < $len; $i++) {
        if ($data[$i]['name'] == "arImage") {
            $res['ar'][$data[$i]['lang']] = $data[$i]['content'];
        }
    }
    $contentDb = new ContentDb($mysql);
    $res['content'] = $contentDb->getContent();
    return $res;
}

function getWordData() {
    $contentId = trim(filter_input(INPUT_GET, "contentId"));
    $lang = trim(filter_input(INPUT_GET, "lang"));
    $lang = $lang == "" ? "zh" : $lang;
    $wordDb = new WordDb();
    $res['word'] = $wordDb->getWordData($contentId);
    if ($lang == "zh") {
        $res['pic']['luyinjian'] = "../CommonAsset/img/录音键常态.png";
        $res['pic']['zhengzaily'] = "../CommonAsset/img/正在录音动画.png";
    } else if ($lang == "en") {
        $res['pic']['luyinjian'] = "../CommonAsset/img/录音键常态-eng.png";
        $res['pic']['zhengzaily'] = "../CommonAsset/img/recording_animation.png";
    }
    return $res;
}

function getTextData() {
    $contentId = trim(filter_input(INPUT_GET, "contentId"));
    $lang = trim(filter_input(INPUT_GET, "lang"));
    $textDb = new TextDb();
    $mediaData = $textDb->getTextMeida($contentId);
    $textData = $textDb->getTextData($contentId);
    $textMap = $textDb->getTextMap($lang);

    $textMapTemp = array();
    foreach ($textMap as $item) {
        array_push($textMapTemp, $item['lang_map']);
    }

    $readTitle = array();
    $readTextTemp = array();
    foreach ($textData as $item) {
        if (!in_array($item['lang'], $textMapTemp)) {
            continue;
        }
        if ($item['type'] == 2) {   //标题
            $readTitle['lang'][$item['lang']] = $item['text'];
        } else if ($item['type'] == 1) {   //课文
            if (!isset($readTextTemp[$item['current_time']])) {
                $readTextTemp[$item['current_time']]['lang'] = array();
            }
            $readTextTemp[$item['current_time']]['lang'][$item['lang']] = $item['text'];
        }
    }
    $readTexts = array();
    foreach ($readTextTemp as $time => $item) {
        $temp['lang'] = $item['lang'];
        $temp['currentTime'] = $time;
        array_push($readTexts, $temp);
    }

    $readAudio = "";
    $readImage = "";
    foreach ($mediaData as $media) {
        if ($media['type'] == 2) {  // 1=video  2=audio 3=image
            $readAudio = $media['media_url'];
        } else if ($media['type'] == 3) {
            $readImage = $media['media_url'];
        }
    }

    $res['readTitle'] = $readTitle;
    $res['readTexts'] = $readTexts;
    $res['readAudio'] = $readAudio;
    $res['readImage'] = $readImage;

    return $res;
}

function getHomeData() {
    $lang = trim(filter_input(INPUT_GET, "lang"));
    $lang = $lang == "" ? "zh" : $lang;
    $homeDb = new HomeDb();
    $data = $homeDb->getHomeContent();
    $res = array();

    // 按钮
    $btns = array();
    $btns[0]['id'] = 0;
    $btns[0]['name'] = "";
    $btns[0]['url'] = "./Read.html";
    $btns[0]['img'] = "../CommonAsset/img/bt_01.png";
    $btns[0]['status'] = 0;
    $btns[1]['id'] = 0;
    $btns[1]['name'] = "";
    $btns[1]['url'] = "./Word.html";
    $btns[1]['img'] = "../CommonAsset/img/bt_02.png";
    $btns[1]['status'] = 0;
    $btns[2]['id'] = 0;
    $btns[2]['name'] = "";
    $btns[2]['url'] = "./puzzle/index.html";
    $btns[2]['img'] = "../CommonAsset/img/bt_03.png";
    $btns[2]['status'] = 0;
    $btns[3]['id'] = 0;
    $btns[3]['name'] = "";
    $btns[3]['url'] = "./drawGame.html";
    $btns[3]['img'] = "../CommonAsset/img/bt_04.png";
    $btns[3]['status'] = 0;

    //视频相关
    $videos[0]['id'] = 0;
    $videos[0]['name'] = "";
    $videos[0]['url'] = "http://1301325388.vod2.myqcloud.com/aea92fccvodtranscq1301325388/ebe9eaf4387702297528132229/v.f100030.mp4";
    $videos[0]['watched'] = 0;
    $videos[1]['id'] = 1;
    $videos[1]['name'] = "";
    $videos[1]['url'] = "http://1301325388.vod2.myqcloud.com/aea92fccvodtranscq1301325388/ebe9eaf4387702297528132229/v.f100030.mp4";
    $videos[1]['watched'] = 0;
    $videos[2]['id'] = 2;
    $videos[2]['name'] = "";
    $videos[2]['url'] = "http://1301325388.vod2.myqcloud.com/aea92fccvodtranscq1301325388/ebe9eaf4387702297528132229/v.f100030.mp4";
    $videos[2]['watched'] = 0;
    $videos[3]['id'] = 3;
    $videos[3]['name'] = "";
    $videos[3]['url'] = "http://1301325388.vod2.myqcloud.com/aea92fccvodtranscq1301325388/ebe9eaf4387702297528132229/v.f100030.mp4";
    $videos[3]['watched'] = 0;

    $successWord = [];
    $btnIndex = 0;
    $videoIndex = 0;
    $textArray = [];
    // type 0=不显示 1=文字 2=按钮 3=视频 4=成功
    for ($i = 0, $len = count($data); $i < $len; $i++) {
        if ($lang != $data[$i]['lang'] || $data[$i]['type'] == 0) {
            continue;
        }
        if ($data[$i]['type'] == 2) {
            $btns[$btnIndex]['name'] = $data[$i]['content'];
            $btnIndex++;
        } else if ($data[$i]['type'] == 3) {
            $videos[$videoIndex]['name'] = $data[$i]['content'];
            $videoIndex++;
        } else if ($data[$i]['type'] == 4) {
            array_push($successWord, $data[$i]['content']);
        } else if ($data[$i]['type'] == 1) {
            $textArray[$data[$i]['name']] = $data[$i]['content'];
        }
    }

    $res['textArray'] = $textArray;
    $res['btns'] = $btns;
    $res['videos'] = $videos;
    if ($lang == "zh") {
        $res['successWord'] = "../CommonAsset/img/四句中文.png";
    } else if ($lang == "en") {
        $res['successWord'] = "../CommonAsset/img/四句英文.png";
    }


    return $res;
}

function addAction() {
    $version = strtolower(filter_input(INPUT_GET, "version"));
    $os = strtolower(filter_input(INPUT_GET, "os"));
    $userID = filter_input(INPUT_GET, "userID");
    $userName = filter_input(INPUT_GET, "userName");
    $ip = filter_input(INPUT_SERVER, "REMOTE_ADDR");

    $mysql = new InMysql();
    $statDb = new StatDb($mysql);
    $statDb->addStart($userID, $userName, $version, $os, $ip, "", "start");
    $data = array();

    return $data;
}
