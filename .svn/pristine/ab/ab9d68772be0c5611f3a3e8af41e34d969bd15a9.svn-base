<?php

header("Content-Type: text/html;charset=utf8");

class IndexDb {

    private $mysql;

    public function __construct(InMysql $mysql = null) {
        if ($mysql == null) {
            $this->mysql = new InMysql();
        } else {
            $this->mysql = $mysql;
        }
    }

    /**
     * 获得首页文字内容
     */
    public function getIndexContent() {
        $sql = "select * from t_index;";
        return $this->mysql->fetchData($sql);
    }
}
