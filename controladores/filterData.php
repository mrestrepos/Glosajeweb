<?php

function getConditionalKeyword($query)
{
  return strpos($query, "WHERE") ? " AND" : " WHERE";
}

function getProducts($conn)
{
  $decodeData = $_GET;

  $query = "SELECT * FROM productos p INNER JOIN categorias c ON p.categoriaId = c.cod_categoria";
  $lastQueries = [];
  $prepareValues = [];

  $orderByReducer = [
    "ASC" => "p.nombre_producto ASC",
    "DESC" => "p.nombre_producto DESC",
    "maxPrice" => "p.precio_producto DESC",
    "minPrice" => "p.precio_producto ASC",
  ];

  $reducer = [
    "types" => function ($value, $query) use (&$prepareValues) {

      $values = explode(",", str_replace("+", " ", $value));

      $placeholders = implode(',', array_fill(0, count($values), '?'));
      array_push($prepareValues, $values);

      return getConditionalKeyword($query) . " c.nombre_categoria IN ($placeholders)";
    },

    "minPrice" => function ($price, $query) {
      return getConditionalKeyword($query) . " p.precio_producto >= $price";
    },

    "maxPrice" => function ($price, $query) use ($decodeData) {
      if ($price <= ($decodeData["minPrice"] || 0)) {
        return "";
      }

      return getConditionalKeyword($query) . " p.precio_producto <= $price";
    },

    "sort" => function ($value) use (&$lastQueries, $orderByReducer) {

      $orderBy = isset($orderByReducer[$value]) ? $orderByReducer[$value] : null;

      if (isset($orderBy)) {
        array_push($lastQueries, " ORDER BY $orderBy");
      }
      return "";
    }
  ];

  foreach ($decodeData as $key => $value) {
    $exec = $reducer[$key];

    if (!isset($exec)) {
      continue;
    }

    $query .= $exec($value, $query);
  }

  if (count($lastQueries) > 0) {
    foreach ($lastQueries as $lastQuery) {

      $query .= $lastQuery;
    }
  }


  try {
    $exec = $conn;
    $exec = $exec->prepare($query);

    if (count($prepareValues) > 0) {
      $arr = array_merge(...$prepareValues);
      $exec->bind_param(str_repeat("s", count($arr)), ...$arr);
    }

    $exec->execute();

    return $exec->get_result();
  } catch (Exception $e) {
    return false;
  }
}
