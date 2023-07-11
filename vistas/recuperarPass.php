<?php
session_start();
//Si  existe una session de usuario asociada un correo 
if (isset($_SESSION["usuario"])) {

    //Redireccionando al index
    header("location: ./../index.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login y Register</title>

    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="../assets/css/utils.css">
    <link rel="stylesheet" href="../assetsLogin/css/estilos.css">
</head>

<body>

    <main>
        <div class="loader"></div>
        <div class="contenedor__todo">
            <div class="caja__trasera">
                <div class="caja__trasera-register">
                    <button id="btn__registrarse" onclick="handleComeBack()" style="color:gray">Volver</button>
                </div>
            </div>

            <!--Formulario de Login y registro-->
            <div class="contenedor__login-register">
                <!--Login-->
                <form action="../controladores/recuperarPassword.php" method="POST" class="formulario__login" data-form-get-password="true">
                    <h2>Recuperar contraseña</h2>
                    <input data-field-name="email" data-valid="false" type="email" placeholder="Correo Electronico" name="Correo" required="required">
                    <button type="submit" disabled>Recuperar</button>
                </form>

    </main>

    <footer>
        <?php
        //Variables parametros conexion servidor y bases de datos 


        /*
    Hacemos el llamado al archivo que contiene los valores 
    parametros para conectarnos a la base de datos
*/

        require '../config/conexionBasesDatos.php';
        $conexion = new mysqli($host, $user, $password, $dbname, $port, $socket);

        //Verificamos la conexión
        /*  if($conexion -> connect_errno){
    echo" <br> <p>Error de conexión a la base de datos </p> " . $conexion -> connect_error;
   
    exit();
}else{
    echo"<br><p> Conectados al servidor y listos para usar la base de datos </p>" . $dbname;
}  */


        ?>
    </footer>

    <script src="../assetsLogin/js/script.js"></script>

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script type="text/javascript">
        $(window).load(function() {
            $(".loader").fadeOut("slow");
        });
    </script>

    <script>
        const handleComeBack = () => location.href = "http://localhost/glosajeWebV2/vistas/login.php";
    </script>
    <script type="module">
        import {
            handleValidateFields,
            handleOnBlurFields
        } from "../assetsLogin/js/handleValidateFields.js";
        import {
            useFetch,
            messages
        } from "../assets/js/utils/index.js";

        const form = document.querySelector("[data-form-get-password]");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const data = new FormData(form);

            const {
                request
            } = await useFetch({
                method: "POST",
                url: form.action,
                useLoader: event.target,
                body: data,
                failFetchOptions: {
                    useAbortEndedTime: true,
                    maxTime: 5000
                }
            });

            if (request?.ok) {
                messages.activeGlobalMessageV2({
                    message: "Revise su correo electronico"
                });
            }
        });

        handleValidateFields(form);

        form.querySelectorAll("[data-field-name='email']").forEach(element => {
            return handleOnBlurFields(element);
        });
    </script>
</body>

</html>