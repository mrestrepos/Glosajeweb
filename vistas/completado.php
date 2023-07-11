<?php
require '../config/config.php';
require '../config/database.php';

require '../config/conexionBasesDatos.php';

if (!isset($_SESSION['id'])) {
  header('Location: login.php');
}

$idCliente = $_SESSION['id'];
$db = new Database();
$con = $db->conectar();

$id_transaccion = isset($_GET['key']) ? $_GET['key'] : 0;
$_SESSION['id_transaccion'] = $id_transaccion;
$error = '';
if ($id_transaccion == 0) {
  $error = 'error al procesar la petición';
} else {
  $sql = $con->prepare("SELECT count(cod_compra)  FROM compras WHERE id_transaccion =? AND status = ?");
  $sql->execute([$id_transaccion, 'COMPLETED']);

  if ($sql->fetchColumn() > 0) {
    $sql = $con->prepare("SELECT cod_compra,fecha,email,total FROM compras WHERE id_transaccion =? AND status = ? LIMIT 1");
    $sql->execute([$id_transaccion, 'COMPLETED']);
    $row = $sql->fetch(PDO::FETCH_ASSOC);

    $idCompra = $row['cod_compra'];
    $total = $row['total'];
    $fecha = $row['fecha'];

    $_SESSION['idCompra'] = $idCompra;
    $_SESSION['total'] = $total;
    $_SESSION['fecha'] = $fecha;

    $sqlDet = $con->prepare('SELECT nombre_producto,precio_producto,cantidad FROM detalle_compra WHERE cod_compra = ?');
    $sqlDet->execute([$idCompra]);
    //$row_detalle = $sqlDet->fetch(PDO::FETCH_ASSOC);


    // $sqlDet->fetch(PDO::FETCH_ASSOC);
    /*   print_r($sqlDet['cantidad']);
            print_r($sqlDet['nombre_producto']) ; */
  } else {
    $error = 'Error al verificar la compra';
  }
}

include("./layouts/header.php");
?>
<link rel="stylesheet" href="../assets/css/public/index.css">
<link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
<link href="../assets/css/admin.css" rel="stylesheet" />
<script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
<div class="loader"></div>
<div class="container-fluid px-4 mt-4">
  <div class="card mb-4">
    <div class="card-header">
      <i class="fas fa-dollar-sign"></i>Información de Compra
    </div>
    <?php if (strlen($error) > 0) { ?>
      <div class="row">
        <div class="col">
          <h3><?php echo $error; ?></h3>
        </div>
      </div>
    <?php } else { ?>

      <div class="row">
        <div class="col">
          <b class="ms-4">Id Compra:</b><?php echo $idCompra ?><br>
          <b class="ms-4">Id Transacción:</b><?php echo $id_transaccion ?><br>
          <b class="ms-4">Id Cliente:</b><?php echo $idCliente ?><br>
          <b class="ms-4">Fecha compra:</b><?php echo $fecha ?><br>
          <b class="ms-4">Total: </b><?php echo '$' . number_format($total, 2, '.', ',') . ' COP';   ?><br>
        </div>
      </div>

      <div class="card mb-4">

        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Producto</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>

              <?php while ($row_det = $sqlDet->fetch(PDO::FETCH_ASSOC)) {
                $subtotal = $row_det['precio_producto'] * $row_det['cantidad'];
              ?>
                <tr>
                  <td> <?php echo $row_det['cantidad'] ?></td>
                  <td> <?php echo $row_det['nombre_producto'] ?></td>
                  <td> <?php echo '$' . number_format($subtotal, 2, '.', ','); ?></td>
                </tr>
              <?php } ?>
            </tbody>
          </table>
        </div>
      </div>
    <?php } ?>
  </div>
  <a href="../reportes/reFacturas.php">Descargar PDF</a>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="./../assets/js/scripts.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>


<script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script type="text/javascript">
  $(window).load(function() {
    $(".loader").fadeOut("slow");
  });
</script>

<?php
include("./layouts/footer.php");
?>