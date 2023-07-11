    <?php
    session_start();
    include("./layouts/header.php");
    ?>

    <link rel="stylesheet" href="./../assets/css/public/index.css">
    <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
    <div class="loader"></div>
    <div class="card">
      <div class="card-header">
        <i class="fas fa-address-book me-2"></i><b>Contacto</b>
      </div>
      <div class="card-body">
        <p>
          <b>Creaciones Glosaje</b> es una microempresa antioqueña con 10 años
          de experiencia dedicada a la confección y venta de ropa interior.<br>
          Ubicada en el área metropolitana de la ciudad de <b>Medellín</b>. <br>
          <b> Dirección:</b> Cra 34#71-29. <br>
          <b>Propietaria:</b> Gloria Alcazar.<br>
          <b>Telefono de contacto:</b><i class="fas fa-phone ms-2 me-2"></i><i class="fa-brands fa-whatsapp ms-2 me-2"></i> 3104719942 <br>
          <b>Facebook:</b> <a href="#"><i class="fa-brands fa-facebook ms-2 me-2"></i> </a>
        </p>
      </div>
    </div>

    <?php
    include("./layouts/footer.php");
    ?>