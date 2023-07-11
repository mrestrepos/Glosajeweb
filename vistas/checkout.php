<?php

require '../config/config.php';
require '../config/database.php';

$db = new Database();
$con = $db->conectar();

if (!isset($_SESSION['id'])) {
  header('Location: login.php'); //Redireccionando al login
}

include("./layouts/header.php");
?>
<div id="mainContainer">
  <?php

  include("./modal/cart.html");
  ?>
  <div class="table-responsive">

    <table class="table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>

        </tr>
      </thead>
      <tbody data-global-render='initCartItems'></tbody>
    </table>
  </div>
  <div class="row">
    <div class="col-md-5 offset-md-7 d-grip gap-2">
      <button class="btn btn-primary btn-lg" data-global-type='purchaseItems' data-cart-hidden>Realizar pago</button>
      <p>Total <span data-cart-total></span></p>
    </div>
  </div>
</div>

<!-- Modal -->

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script>
  let eliminaModal = document.getElementById('eliminaModal');
  eliminaModal.addEventListener('show.bs.modal', function(event) {
    let button = event.relatedTarget;
    let id = button.getAttribute('data-bs-id'); //Obteniendo el ID pasado atraves del botón
    let buttonElimina = eliminaModal.querySelector('.modal-footer #btn-elimina');
    buttonElimina.value = id;
  })

  function actualizaCantidad(cantidad, id) {
    let url = '../controladores/actualizar_carrito.php';
    let formData = new FormData();
    formData.append('action', 'agregar');
    formData.append('id', id);
    formData.append('cantidad', cantidad);

    fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'cors'
      }).then(response => response.json())
      .then(data => {
        if (data.ok) {
          let divsubtotal = document.getElementById('subtotal_' + id);
          divsubtotal.innerHTML = data.sub;
          let total = 0.00;
          let lista = document.getElementsByName('subtotal[]');

          for (let i = 0; i < lista.length; i++) {
            total += parseFloat(lista[i].innerHTML.replace(/[$,]/g, ''));

          }
          total = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2
          }).format(total);

          document.getElementById('total').innerHTML = '<?php echo MONEDA; ?>' + total;
        }
      })

  }

  function eliminar() {

    let buttonElimina = document.getElementById('btn-elimina');
    let id = buttonElimina.value;

    let url = '../controladores/actualizar_carrito.php';
    let formData = new FormData();
    formData.append('action', 'eliminar');
    formData.append('id', id);


    fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'cors'
      }).then(response => response.json())
      .then(data => {
        if (data.ok) {
          location.reload(); // Recargar la pagina

        }
      })

  }
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