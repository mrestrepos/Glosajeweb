<?php

function userSession($useSession = true)
{
  require "./../config/conexionBasesDatos.php";

  if ($useSession) {
    session_start();
  }

  $user = $_SESSION["usuario"];
  $query = "SELECT * FROM usuarios WHERE correo_user = '$user'";
  $getUser = $conexion->query($query);

  $data = array();

  while ($row = $getUser->fetch_assoc()) {
    $data[] = $row;
  }
  return $data[0];
}

function userId($useSession = true)
{
  if ($useSession) {
    session_start();
  }

  session_start();

  return isset($_SESSION["id"]) ? $_SESSION["id"] : null;
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {

  header("Content-Type: application/json");
  echo json_encode([
    "user" => userSession()
  ]);
}
