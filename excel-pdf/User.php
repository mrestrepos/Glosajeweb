<?php

require_once("db/Model.php");

class User extends Model
{

  public function __construct($table = "usuarios")
  {
    parent::__construct($table);
  }

  public function get_user($id)
  {

    return parent::getAll([
      "idUser" => $id
    ]);
  }

  public function createUser(...$fields)
  {
    list($id, $name, $lastName, $email, $password, $phoneNumber, $city, $direction) = $fields;

    return parent::insert([
      "idUser" => $id,
      "nombres_usuario" => $name,
      "apellidos_usuario" => $lastName,
      "correo_user" => $email,
      "contrasena" => $password,
      "tel_user" => $phoneNumber,
      "municipio" => $city,
      "direccion_exacta" => $direction
    ]);
  }
}
