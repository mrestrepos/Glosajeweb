<?php

require "./../config/conexionBasesDatos.php";
require "./getUserSession.php";

$userId = userId(false);

$data = file_get_contents("php://input");
$cart = json_decode($data, true);
$filterCart = array_filter($cart, function ($obj) use ($userId) {
  ["userId" => $id] = $obj;

  return $id == $userId;
});

$cartProducts = array_map(function ($obj) {
  ["productId" => $id] = $obj;
  return $id;
}, $filterCart);

$placeholders = array_fill(0, count($cartProducts), "?");

$query = "SELECT * FROM productos WHERE codProducto IN (" . implode(",", $placeholders) . ")";


$conn = $conexion->prepare($query);

$conn->bind_param(str_repeat("i", count($cartProducts)), ...$cartProducts);
$conn->execute();
$conn = $conn->get_result();

$data = array();

while ($row = $conn->fetch_assoc()) {
  $data[] = $row;
}

header("Content-Type: application/json");
echo json_encode([
  "products" => $data,
]);

exit();
