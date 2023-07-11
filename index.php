<?php

session_start();
require "./controladores/filterData.php";
require "./config/conexionBasesDatos.php";

$getData = getProducts($conexion);

include("./vistas/layouts/header.php")
?>
<link rel="stylesheet" href="./assets/css/public/index.css">
<link rel="stylesheet" href="./assets/css/public/global.css">

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id="mainContainer">
  <?php
  while ($row = $getData->fetch_assoc()) {
    $precioDesc = $row['precio_producto'] - (($row['precio_producto'] * $row['descuento']) / 100);
  ?>


    <div class="col">
      <div class="card shadow-sm">
        <?php
        $id = $row['codProducto'];
        $imagen = "./assets/images/productos/" . $id . "/principal.jpg";

        if (!file_exists($imagen)) {
          $imagen = "./assets/images/no-photo.jpg";
        }
        ?>
        <a href="./vistas/details.php?id=<?php echo $row['codProducto']; ?>&token=<?php echo $row['codProducto']; ?>" title="principal">
          <img src="<?php echo $imagen ?>" class="d-block w-100" id="mainImg">
        </a>


        <div class="card-body">
          <p class="card-text text-muted"><?php echo $row["nombre_categoria"]; ?></p>
          <h5 class="card-title"><?php echo $row['nombre_producto']; ?></h5>
          <p class="card-text"><?php echo number_format($precioDesc, 2, ".", ","); ?> COP</p>
          <div class="d-flex justify-content-between align-items-center" data-global-id='<?php echo $id; ?>'>
            <div class="btn-group">
              <!-- <a href="./vistas/login.php" class="btn btn-primary">Detalles</a> -->
              <a href="./vistas/details.php?id=<?php echo $row['codProducto']; ?>&token=<?php echo $row['codProducto']; ?>" class="btn btn-primary">Detalles</a>
            </div>
            <!-- <a href="./vistas/login.php">
                </a> -->

            <?php
            if (isset($_SESSION["usuario"])) {
            ?>
              <button class="btn btn-outline-success" type="button" data-global-type='addToCart'>
                Agregar al carrito</button>
            <?php
            } else {
            ?>
              <a href="./vistas/login.php" class="btn btn-outline-success">Agregar al carrito</a>
            <?php
            }
            ?>

          </div>
        </div>
      </div>
    </div>

  <?php
  }
  ?>

</div>
<script src="./assets/js/public/filter/main.js" type="module"></script>

<?php include("./vistas/layouts/footer.php") ?>