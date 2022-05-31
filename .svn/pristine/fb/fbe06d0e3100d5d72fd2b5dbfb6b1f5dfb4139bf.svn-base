<?php

header("Content-Type: text/html;charset=utf8");

class StatDb {

    private $mysql;

    public function __construct(InMysql $mysql = null) {
        if ($mysql == null) {
            $this->mysql = new InMysql();
        } else {
            $this->mysql = $mysql;
        }
    }

    /**
     * 记录用户动作
     */
    public function addStart($userId, $userName, $version, $os, $ip, $card, $action) {
        $sql = "insert into t_stat_action(user_id,user_name,version,os,ip,card,action,create_time) values('" .
            $userId . "','" . $userName . "','" . $version . "','" . $os . "','" . $ip . "','" . $card . "','" . $action . "',now())";
        return $this->mysql->insertData($sql);
    }
}
