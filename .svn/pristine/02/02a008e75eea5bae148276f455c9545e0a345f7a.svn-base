<?php

header("Content-Type: text/html;charset=utf8");

class WordDb {

    private $mysql;

    public function __construct(InMysql $mysql = null) {
        if ($mysql == null) {
            $this->mysql = new InMysql();
        } else {
            $this->mysql = $mysql;
        }
    }

    /**
     * 获得生词内容
     */
    public function getWordData($id) {
        $sql = "select * from t_word where content_id = '" . $id . "';";
        return $this->mysql->fetchData($sql);
    }
}
