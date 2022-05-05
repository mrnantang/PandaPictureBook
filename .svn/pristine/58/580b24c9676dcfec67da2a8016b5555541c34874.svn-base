<?php

header("Content-Type: text/html;charset=utf8");

class TextDb {

    private $mysql;

    public function __construct(InMysql $mysql = null) {
        if ($mysql == null) {
            $this->mysql = new InMysql();
        } else {
            $this->mysql = $mysql;
        }
    }

    /**
     * 获得Text内容
     */
    public function getTextData($id) {
        $sql = "select * from t_text where content_id = '" . $id . "';";
        return $this->mysql->fetchData($sql);
    }

    public function getTextMap($lang) {
        $sql = "select * from t_text_lang_map where lang = '" . $lang . "' order by shunxu;";
        return $this->mysql->fetchData($sql);
    }

    public function getTextMeida($id) {
        $sql = "select * from t_text_media where content_id = '" . $id . "';";
        return $this->mysql->fetchData($sql);
    }
}
