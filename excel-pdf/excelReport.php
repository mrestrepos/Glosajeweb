<?php
  $fileName = "users";
  header("Content-Type: application/xls");
  header("Content-Disposition: attachment; filename= $fileName.xls");
  include("index.php");
