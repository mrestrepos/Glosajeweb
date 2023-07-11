<?php
    require '../config/config.php';
    require '../config/database.php';
    if(!isset($_SESSION['id'])){
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode([
            "message" => "Session expirada"
        ]);
        header('Location: ../vistas/login.php');
        exit();
        
    }

    if(isset($_GET['id']) && intval($_GET['id'])){
        // $idCategoria = $_GET['id'];
        $idCategoria = 2;
       
        $db = new Database();
        $con = $db->conectar();
        $sql = $con->prepare("DELETE FROM categorias  WHERE cod_categoria = ?");
        $result =  $sql->execute([$idCategoria ]);
        if(!$result){

            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode([
                "message" => "Error al eliminar la categoria"
            ]);
            header('Location: ../vistas/login.php');
            exit();
            // die("Error al eliminar La categoria");
        }

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode([
            "message" => "Categoria eliminada exitosamente"
        ]);
        header('Location: ../vistas/login.php');
        exit();

        // $_SESSION['message'] = "Caregoria eliminada exitosamente";
        // $_SESSION['message_type'] = "danger";
        // header("location: ../vistas/categorias.php");
    }
