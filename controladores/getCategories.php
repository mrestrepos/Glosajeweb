<?php

require "./../config/conexionBasesDatos.php";

$query = "SELECT * FROM categorias";

$conn = $conexion->query($query);

$data = array();

while ($row = $conn->fetch_assoc()) {
  $data[] = $row;
}

header("Content-Type: application/json");
echo json_encode($data);