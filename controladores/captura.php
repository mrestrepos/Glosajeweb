<?php
require '../config/config.php';
require '../config/database.php';
$db = new Database();
$con = $db->conectar();

/* if(!isset($_SESSION['id'])){
        header('Location: login.php');//Redireccionando al login
    }
     */

$id_cliente = $_SESSION['id'];

$json = file_get_contents('php://input');
$datos = json_decode($json, true);
["detalles" => $detalles, "cart" => $cart] = json_decode($json, true);

echo '<pre>';
print_r($datos);
echo '/<pre>';

if (is_array($datos)) {
    ["id" => $id_transaccion, "purchase_units" => $purchase_units, "update_time" => $fecha, "status" => $status, "payer" => $payer] = $detalles;
    $total = $purchase_units[0]['amount']['value'];
    $fecha_nueva = date('Y-m-d H:i:s', strtotime($fecha));
    $email = $payer['email_address'];
    $id_titular = $payer['payer_id'];


    $sql = $con->prepare("INSERT INTO compras(id_transaccion,fecha, status, email,id_cliente,id_titular, total) VALUES(?,?,?,?,?,?,?)");
    $sql->execute([$id_transaccion, $fecha, $status, $email, $id_cliente, $id_titular, $total]);
    $id = $con->lastInsertId();
    if (isset($id)) {

        $productos = isset($_SESSION['carrito']['productos']) ? $_SESSION['carrito']['productos'] : null;
        if (count($cart)) {
            $placeholders = array_fill(0, count($cart), "?");
            $productIds = array();

            foreach ($cart as $cartItem) {
                ["productId" => $productId] = $cartItem;

                array_push($productIds, $productId);
            }

            $query = "SELECT * FROM productos WHERE codProducto IN (" . implode(",", $placeholders) . ") AND activo = 1";
            $sql = $con->prepare($query);
            $sql->execute($productIds);

            foreach ($sql as $row) {
                ["precio_producto" => $precio_producto, "codProducto" => $codProducto, "nombre_producto" => $nombre_producto, "descuento" => $descuento] = $row;
                $query = "INSERT INTO detalle_compra(cod_compra, cod_producto, nombre_producto, precio_producto, cantidad) VALUES (?, ?, ?, ?, ?)";
                $sql = $con->prepare($query);
                $cantidad = 1;
                $subtotal = $precio_producto;
                foreach ($cart as $item) {
                    ["productId" => $productid, "quantity" => $quantity] = $item;
                    if ($productid == $codProducto) {
                        $cantidad = $quantity;
                        $subtotal = ($precio_producto * $quantity) - ($precio_producto * ($descuento / 100));
                        break;
                    }
                }
                $sql->execute([$id, $codProducto, $nombre_producto, $subtotal, $cantidad]);
            }
            include './enviar_email.php';
        }
        unset($_SESSION['carrito']); //Vaciar el carrito
        // header('location:../catalogo.php');

    }
}
