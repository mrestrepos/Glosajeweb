<?php
require '../config/config.php';
require '../config/database.php';
$db = new Database();
$con = $db->conectar();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents("php://input");
    $sessionData = json_decode($data, true);

    $_SESSION["cartItems"] = $sessionData;
    http_response_code(200);
    exit();
}

if (!isset($_SESSION['id']) || !isset($_SESSION["cartItems"])) {
    header('Location: ./../index.php');
    exit();
}
$cartItems = $_SESSION['cartItems'];
$cartJson = json_encode($cartItems);

$placeholders = array_fill(0, count($cartItems), "?");

$query = "SELECT * FROM productos WHERE codProducto IN (" . implode(",", $placeholders) . ") AND activo = 1";

$productos = isset($_SESSION['carrito']['productos']) ? $_SESSION['carrito']['productos'] : null;
$total = 0;
$productIds = array();

foreach ($cartItems as $cartItem) {
    ["productId" => $productId, "quantity" => $quantity] = $cartItem;

    array_push($productIds, $productId);
}

$sql = $con->prepare($query);
$sql->execute($productIds);

// unset($_SESSION["cartItems"]);

include("./layouts/header.php");
?>

<div class="loader"></div>
<div class="row">

    <div class="col-6">
        <h4> Detalles de pago</h4>
        <div id="paypal-button-container"></div>
    </div>
    <div class="col-6">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>

                    </tr>
                </thead>
                <tbody>
                    <?php if ($sql == null) {
                        echo '<tr><td colspan="5" class="text-center"><b>Lista vacía</b></td></tr>';
                    } else {
                        foreach ($sql as $producto) {
                            $_id = $producto['codProducto'];
                            $nombre = $producto['nombre_producto'];
                            $precio =  $producto['precio_producto'];
                            $descuento = $producto["descuento"];
                            $subtotal = $precio;
                            $cantidad = 1;

                            foreach ($cartItems as $cartItem) {
                                ["productId" => $productId, "quantity" => $quantity] = $cartItem;

                                if ($_id == $productId) {
                                    $subtotal = $subtotal - (($subtotal * $descuento) / 100);
                                    $total += $quantity * $subtotal;
                                    $cantidad = $quantity;
                                    break;
                                }
                            }
                    ?>

                            <tr>
                                <td><?php echo $nombre; ?></td>
                                <td><?php echo $cantidad; ?></td>
                                <td><?php echo $subtotal; ?></td>
                            </tr>
                        <?php } ?>
                        <tr>

                            <td colspan="2">
                                <p class="h3 text-end" id="total"><?php echo MONEDA . number_format($total, 2, '.', ','); ?></p>
                            </td>
                        </tr>

                </tbody>
            <?php } ?>

            </table>
        </div>

    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

    <script src="https://www.paypal.com/sdk/js?client-id=<?php echo CLIENT_ID; ?>&components=buttons&currency=<?php echo CURRENCY; ?>"></script>


    <script>
        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'pay'
            },
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {

                            value: <?php echo $total; ?>
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                actions.order.capture().then(function(detalles) {
                    let url = '../controladores/captura.php';
                    const cart = <?php echo $cartJson; ?>;
                    return fetch(url, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                detalles,
                                cart
                            })
                        }).then(function(response) {
                            const {
                                id
                            } = detalles
                            window.location.href = `./completado.php?key=${id}` //$datos['detalles']['id']
                        })
                        // .then(data => console.log(data))
                        .catch(e => console.log(`Error: ${e.message}`))
                });
            },
            onCancel: function(data) {
                alert('Pago cancelado');
                console.log(data);
            }
        }).render('#paypal-button-container');
    </script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script type="text/javascript">
        $(window).load(function() {
            $(".loader").fadeOut("slow");
        });
    </script>

    <?php

    include("./layouts/footer.php");
    ?>