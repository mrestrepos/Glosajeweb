<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>

  <?php
  $conn = mysqli_connect("localhost", "root", "", "schema");
  $query = "SELECT * FROM paciente";
  $get_data = mysqli_query($conn, $query);
  $fileName = "users";
  header("Content-Type: application/vn-ms-excel");
  header("Content-Disposition: attachment; filename=$fileName.xls");
  ?>
</body>

</html>