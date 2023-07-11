<?php


require "../config/conexionBasesDatos.php";

$type = isset($_GET["type"]) ? $_GET["type"] : "default";
$table = isset($_GET["table"]) ? $_GET["table"] : "default";

$types = [
  "CATEGORIES" => "categories",
  "MIN_MAX_PRICE" => "getMinAndMaxPrice"
];

switch ($type) {
  case $types["CATEGORIES"]:
    $query = "SELECT nombre_categoria FROM categorias";
    break;

  case $types["MIN_MAX_PRICE"]:
    $query = "SELECT MIN(precio_producto) AS 'minPrice', MAX(precio_producto) AS 'maxPrice' FROM productos";
    break;

  default:
    http_response_code(403);
    header("Content-Type: application/json");
    echo json_encode([
      "message" => "Categorias no encontradas",
    ]);
    exit();
}

$filtersRequired = $conexion->query($query)->fetch_all();

header("Content-Type: application/json");
echo json_encode([
  "filtersRequired" => $filtersRequired
]);

exit();

$authorization = isset($_SERVER["HTTP_AUTHORIZATION"]) ? $_SERVER["HTTP_AUTHORIZATION"] : "";
