<?php
require '../config/config.php';
require '../config/database.php';
$db = new Database();
$con = $db->conectar();

if (!isset($_SESSION['id'])) {
  header('Location: login.php'); //Redireccionando al login
}

$id = isset($_GET['id']) ? $_GET['id'] : '';
$token = isset($_GET['token']) ? $_GET['token'] : '';

if ($id == '' || $token == '') {
  echo 'Error al procesar la petición';
  exit;
} else {
  // $token_tmp = hash_hmac('sha1',$id,KEY_TOKEN);
  if ($token) {
    // if($token == $token_tmp){
    $sql = $con->prepare("SELECT count(codProducto)  FROM productos WHERE codProducto=? AND activo = 1");
    $sql->execute([$id]);

    if ($sql->fetchColumn() > 0) {
      $sql = $con->prepare("SELECT nombre_producto,descripcion,precio_producto,descuento FROM productos WHERE codProducto=? AND activo=1 LIMIT 1");
      $sql->execute([$id]);
      $row = $sql->fetch(PDO::FETCH_ASSOC);
      $nombre = $row['nombre_producto'];
      $precio = $row['precio_producto'];
      $descripcion = $row['descripcion'];
      $descuento = $row['descuento'];
      $precio_desc =  $precio - (($precio * $descuento) / 100);
      $dir_images = '../assets/images/productos/' . $id . '/';

      //Creando la carpeta de imagenes del producto si no existe
      if (!file_exists($dir_images)) {
        mkdir($dir_images, 0777, true);
      }

      $ruta_img = $dir_images . 'principal.jpg';
      if (!file_exists($ruta_img)) {
        $ruta_img = '../assets/images/no-photo.jpg';
      }
      $imagenes = array();
      if (file_exists($dir_images)) {


        $dir = dir($dir_images);
        while (($archivo = $dir->read()) != false) {
          if ($archivo != 'principal.jpg' && (strpos($archivo, 'jpg') || strpos($archivo, 'jpeg'))) {

            $imagenes[] = $dir_images . $archivo;
          }
        }
        $dir->close();
      }
    }
  } else {
    echo 'Error al procesar la petición';
    exit;
  }
}

include("./layouts/header.php");
?>

<link rel="stylesheet" href="../assets/css/styles.css">

<div class="loader"></div>
<div class="row" id="mainContainer">
  <div class="col-md-6 order-md-1">
    <div id="carouselImages" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">

          <img src="<?php echo $ruta_img ?>" class="d-block w-100" alt="">
        </div>
        <?php foreach ($imagenes as $img) { ?>
          <div class="carousel-item">

            <img src="<?php echo $img ?>" class="d-block w-100" alt="">
          </div>
        <?php } ?>

      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselImages" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselImages" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

  </div>
  <div class="col-md-6 order-md-2">
    <h2><?php echo $nombre ?> </h2>
    <?php if ($descuento > 0) { ?>
      <p><del><?php echo MONEDA . number_format($precio, 2, '.', ','); ?> </del></p>
      <h2>
        <?php echo MONEDA . number_format($precio_desc, 2, '.', ','); ?>
        <small class="text-success"><?php echo $descuento; ?>% descuento</small>
      </h2>
    <?php } else { ?>
      <h2><?php echo MONEDA . number_format($precio, 2, '.', ','); ?> </h2>
    <?php } ?>

    <p class="lead">
      <?php echo $descripcion ?>
    </p>

    <div class="d-grid gap-3 col-10 mx-auto" data-global-id='<?php echo $id; ?>'>
      <button data-global-type="purchaseSingleProduct" class="btn btn-primary btn-lg">Comprar ahora</button>
      <button class="btn btn-outline-primary" type="button" data-global-type='addToCart'>
        Agregar al carrito</button>
    </div>

  </div>
</div>

<script>
  function addProducto(id, token) {
    let url = '../controladores/carrito.php';
    let formData = new FormData();
    formData.append('id', id);
    formData.append('token', token);

    fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'cors'
      }).then(response => response.json())
      .then(data => {
        if (data.ok) {
          let elemento = document.getElementById("num_cart");
          elemento.innerHTML = data.numero;
        }
      })

  }
</script>

<?php

include("./layouts/footer.php");
?>