<?php

header("Content-Type: text/html;charset=utf8");

class ContentDb {

    private $mysql;

    public function __construct(InMysql $mysql = null) {
        if ($mysql == null) {
            $this->mysql = new InMysql();
        } else {
            $this->mysql = $mysql;
        }
    }

    /**
     * 获得目录内容
     */
    public function getContent() {
        $sql = "select * from t_content;";
        return $this->mysql->fetchData($sql);
    }
}
