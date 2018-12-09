<?php
    // headers needed to test from local host, maybe partially or completely removed
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    header("Access-Control-Allow-Origin: *");

    $filename = "ordered.json";
	$file = fopen($filename, "r") or die("Can't find ".$filename);
	$content = fread($file);
    fclose($file);
	print($content);
?>