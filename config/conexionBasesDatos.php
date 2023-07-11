<?php
//Variables parametros conexion servidor y bases de datos
// phpinfo();
$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="98757682";
$dbname="glosajeWeb";
$conexion = new mysqli($host, $user, $password, $dbname, $port, $socket);

?>