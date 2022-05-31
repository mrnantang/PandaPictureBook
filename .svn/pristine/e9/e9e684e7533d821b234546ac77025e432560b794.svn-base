<?php

header("Content-Type: text/html;charset=utf8");

class HomeDb {

    private $mysql;

    public function __construct(InMysql $mysql = null) {
        if ($mysql == null) {
            $this->mysql = new InMysql();
        } else {
            $this->mysql = $mysql;
        }
    }

    /**
     * 获得熊猫页面文字内容
     */
    public function getHomeContent() {
        $sql = "select * from t_home order by shunxu,id;";
        return $this->mysql->fetchData($sql);
    }
}
