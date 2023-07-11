<?php

require_once("libraries/dompdf/vendor/autoload.php");

use Dompdf\Dompdf;

$dompdf = new Dompdf();
ob_start();
include "index.php";
$html = ob_get_clean();

$dompdf->loadHtml($html);

$dompdf->render();

$dompdf->stream("document.pdf", array("Attachment" => false));
