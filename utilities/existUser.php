<?php

function existUser($conn)
{
  function executeStatement($query, $conn, $param)
  {
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $param);

    $stmt->execute();

    $result = $stmt->get_result();

    $rowCount = $result->num_rows;

    $stmt->close();

    return $rowCount > 0;
  }

  return [
    "email" => function ($email) use ($conn) {
      $query = "SELECT correo_user FROM usuarios WHERE correo_user = ?";

      return executeStatement($query, $conn, $email);
    },

    "identification" => function ($identification) use ($conn) {
      $query = "SELECT idUser FROM usuarios WHERE idUser = ?";

      return executeStatement($query, $conn, $identification);
    }
  ];
}
