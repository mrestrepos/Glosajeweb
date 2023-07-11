<?php

$isLogged = isset($_SESSION["usuario"]);

// $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
// $host = $_SERVER['HTTP_HOST'];
// $basePath = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');

// $server = $protocol . "://" . $host . $basePath;
$server = "http://localhost:8000";

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GlosajeWeb</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<header class="mb-5">
  <div class="navbar navbar-expand-lg   navbar-dark bg-dark shadow-sm">
    <div class="container">
      <a href="<?php echo $server . "/index.php"; ?>" class="navbar-brand">
        <strong>GlosajeWeb</strong>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarHeader">
        <ul class="nav navbar-nav me-auto md-2 mb-lg-0">
          <li class="nav-item">
            <a href="<?php echo $server . "/index.php"; ?>" class="nav-link active">Catalogo</a>
          </li>
          <li class="nav-item">
            <a href="<?php echo $server . "/vistas/contacto.php"; ?>" class="nav-link">Contacto</a>
          </li>
          <?php if (!$isLogged) { ?>
            <li class="nav-item">
              <a href="<?php echo $server . "/vistas/login.php"; ?>" class="nav-link">Iniciar Sesión</a>
            </li>
          <?php } ?>
          <?php if ($isLogged) { ?>
            <li class="nav-item">
              <a href="<?php echo $server . "/vistas/micuenta.php"; ?>" class="nav-link">Mi cuenta</a>
            </li>
            <li class="nav-item">
              <a href="<?php echo $server . "/controladores/cerrarSesion.php"; ?>" class="nav-link">Cerrar Sesión</a>
            </li>
          <?php } ?>

        </ul>
        <?php if ($isLogged) { ?>
          <a href="<?php echo $server . "/vistas/checkout.php"; ?>" class="btn btn-primary">
            Carrito <span data-global-render="cartItemsCount" class="badge bg-secondary">0</span>
          <?php } ?>

          </a>
      </div>
    </div>
  </div>
</header>

<body>
  <main class="container">