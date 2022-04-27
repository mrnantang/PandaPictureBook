<?php

/**
 * 2022熊猫
 * 客户端版本：V1.0
 * 日期：2022-4-26
 */
error_reporting(0);

header("Content-Type: text/html;charset=utf8");

require_once '../common/in_mysql.php';
require_once '../db/index.db.php';

date_default_timezone_set("PRC");
define("SECONDS_IN_DAY", 86400);

$action = trim(filter_input(INPUT_GET, "action"));

switch ($action) {
    case 'getIndexData':    //首页数据
        $res = getIndexData();
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
