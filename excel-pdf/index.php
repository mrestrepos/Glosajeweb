<?php

use FontLib\Table\Type\head;

require "User.php";
require "const/user.php";

$users = new User();

$data = $users->getAll();
// var_dump($users->getAll()->fetch_all());

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  <title>Document</title>
</head>

<body>

  <main class="container mt-3">
    <table class="table table-dark">
      <thead class="thead-light">
        <tr>
          <th scope="col">Identification</th>
          <th scope="col">Name</th>
          <th scope="col">Last name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone number</th>
          <th scope="col">City</th>
        </tr>
      </thead>

      <tbody>
        <?php
        while ($row = $data->fetch_assoc()) {
        ?>
          <tr class="success">
            <td><?php echo $row[$id]; ?></td>
            <td><?php echo $row[$name]; ?></td>
            <td><?php echo $row[$lastName]; ?></td>
            <td><?php echo $row[$email]; ?></td>
            <td><?php echo $row[$phoneNumber]; ?></td>
            <td><?php echo $row[$city]; ?></td>
          </tr>
        <?php

        } ?>
      </tbody>
    </table>

    <section class="d-flex justify-content-around">
      <button class="btn btn-outline-primary" onclick="excelReport()">Excel Report</button>
      <button class="btn btn-outline-warning" onclick="pdfReport()">Pdf Report</button>
    </section>
  </main>

  <script>
    const excelReport = () => {
      location.href = "./excelReport.php";
      // console.log("Reporting")
    }

    const pdfReport = () => {
      location.href = "./pdfReport.php";
      // console.log("Reporting")
    }
  </script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>

</html>

/*

Documents: XML.
Graph: graphos
*/