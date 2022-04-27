<?php

header("Content-Type: text/html;charset=utf8");

class InMysql {

    private $pdo;                       // pdo mysql conncetion

    function __construct() {
        $host = "192.168.3.128";
        $user = "lz06";
        $pwd = "lz06";
        $dbName = "xiongmao";
        $port = "3306";

        $dsn = 'mysql:dbname=' . $dbName . ';host=' . $host . ';port=' . $port; //定义数据源

        try {
            $this->pdo = new PDO($dsn, $user, $pwd); //连接数据库
            $this->pdo->query('set names utf8'); //设置编码
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //设置关联索引获取数据集的时候，关联索引是大写还是小写,不设置就为默认
        } catch (PDOException $e) {
            file_put_contents("conn.error", $e->getMessage());
        }
    }

    /**
     * 查询数据返回数组格式
     * @param $sql
     * @return array
     */
    public function fetchData($sql) {
        $PDOStatement = $this->pdo->query($sql);
        $PDOStatement->setFetchMode(PDO::FETCH_ASSOC);
        return $PDOStatement->fetchAll();
    }

    /**
     * 预处理方式查询
     * @param type $sql
     * @param type $param 参数存放在数组中，跟sql的问号对应
     * @return type
     */
    public function prepareFetch($sql, $param = array()) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($param);
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * 写入数据并返回最后的ID
     * @param $sql
     * @return string
     */
    public function insertData($sql) {
        $this->pdo->exec($sql);
        return $this->pdo->lastInsertId();
    }

    /**
     * 修改或者更新数据，返回影响的数据条数
     * @param $sql
     * @return int
     */
    public function executeData($sql) {
        return $this->pdo->exec($sql);
    }

    /**
     * 批量处理多条sql语句
     * @param type $sqls
     * @return boolean
     */
    public function executeBatch($sqls) {
        try {
            $this->pdo->beginTransaction();
            foreach ($sqls as $sql) {
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute();
            }
            $this->pdo->commit();
        } catch (PDOException $e) {
            $this->pdo->rollBack();
            file_put_contents("conn.error", $e->getMessage());
            return false;
        }
        return true;
    }
}
