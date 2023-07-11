<?php
    require '../config/conexionBasesDatos.php';

    // if(!isset($_SESSION['id'])){
    //     http_response_code(404);
    //     header('Content-Type: application/json');
    //     echo json_encode([
    //         "message" => "Session expirada"
    //     ]);
    //     exit();
    //     // header('Location: ../vistas/login.php');
    // }

    if(isset($_GET['id']) && intval($_GET['id'])){
        $idProducto = $_GET['id'];
        require '../config/config.php';
        require '../config/database.php';
        $db = new Database();
        $con = $db->conectar();
        $sql = $con->prepare("UPDATE productos SET activo = 0 WHERE codProducto = ?");
        $result =  $sql->execute([$idProducto]);
        if(!$result){

            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode([
                "message" => "Error al eliminar el producto"
            ]);

            exit();
            // die("Error al eliminar el producto");
        }
        
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode([
            "message" => "Producto Elimindao satisfactoriamente"
        ]);

        exit();
        // $_SESSION['message'] = "Producto inactivado exitosamente";
        // $_SESSION['message_type'] = "danger";
        // header("location: ../vistas/productos.php");
    }
