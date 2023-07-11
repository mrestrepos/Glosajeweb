<?php
/*
    Hacemos el llamado al archivo que contiene los valores 
    parametros para conectarnos a la base de datos
*/

require '../config/conexionBasesDatos.php';

$idUser = $_POST["idUser"];
$nombre_completo = $_POST["Nombre_Completo"];
$apellidos = $_POST["Apellidos"];
$correo = $_POST["Correo"];
$contrasena = $_POST["Contrasena"];
$confcontrasena = $_POST["confirmarContrasena"];
$tel_user = $_POST["tel_user"];

$municipio = $_POST["municipio"];
$comuna_barrio = $_POST["comuna_barrio"];

if ($comuna_barrio == "Otra") {
    $comuna_barrio = $_POST["otro2"];
}

if ($confcontrasena != $contrasena) {
    http_response_code(406);
    header("Content-Type: application/json");
    echo json_encode([
        "message" => "las contraseñas no coinciden"
    ]);

    exit();
}

$direccion_exacta = $_POST["direccion_exacta"];

$contrasena = hash('sha512', $contrasena);

//Generar token de seguridad cada usuario
$permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generate_string($input, $strength = 16)
{
    $input_length = strlen($input);
    $random_string = '';
    for ($i = 0; $i < $strength; $i++) {
        $random_character = $input[mt_rand(0, $input_length - 1)];
        $random_string .= $random_character;
    }
    return $random_string;
}

$token = generate_string($permitted_chars, 8);

$query = "INSERT INTO usuarios(idUser,nombres_usuario,apellidos_usuario,correo_user,
    contrasena,tel_user,municipio,comuna_barrio,direccion_exacta, token) 
    VALUES('$idUser','$nombre_completo','$apellidos','$correo','$contrasena','$tel_user',
    '$municipio',' $comuna_barrio','$direccion_exacta', '$token')";

//Verificar que la ID del usuario no se repita

if (!(filter_var($correo, FILTER_VALIDATE_EMAIL))) {

    http_response_code(400);
    header("Content-Type: application/json");
    echo json_encode([
        "message" => "Intentalo de nuevo, el correo es inválido"
    ]);

    exit(); //Saliendo del script actual
}

require "./../utilities/existUser.php";

["email" => $email, "identification" => $identification] = existUser($conexion);

if ($email($correo)) {
    http_response_code(409);
    header("Content-Type: application/json");
    echo json_encode([
        "message" => "Este correo ya esta registrado, intenta con otro diferente"
    ]);
    exit();

} else if ($identification($idUser)) {
    header("Content-Type: application/json");
    http_response_code(409);
    echo json_encode([
        "message" => "La identificacion ya existe"
    ]);
    exit();
}
$exec = $conexion->query($query);
if (!$exec) {
    http_response_code(409);
    header("Content-Type: application/json");
    echo json_encode([
        "message" => "Intentalo de nuevo, el usuario no ha sido almacenado"
    ]);
    exit();
}

require '../controladores/Mailer.php';
$mailer = new Mailer();
$url = 'http://localhost:8000/controladores' . '/activar_cliente.php?id=' . $idUser . '&token=' . $token;
$asunto = 'Activar Cuenta - GlosajeWeb';
$cuerpo = "Estimado $nombre_completo: <br> Para continuar con el proceso de registro es indispensable de click en el siguiente 
    enlace <a href='$url'>Activar cuenta</a>";
// include "email_bienvenida.php";

if ($mailer->enviar_email($correo, $asunto, $cuerpo)) {

    http_response_code(201);
    exit();
} else {

    header("Content-Type: application/json");
    http_response_code(409);

    echo json_encode([
        "message" => "Intentalo de nuevo, el correo es inválido"
    ]);
    exit(); //Saliendo del script actual
}
//Si hay una fila o registro de la ejecucion de la consulta anterior

//Verificar que el formato de  correo sea valido

//session_start();

//$_SESSION['id'] = $idUser;
//$_SESSION['correoRegistro'] = $correo;
//session_destroy();
// mysqli_close($conexion); //Cerrando la conexión