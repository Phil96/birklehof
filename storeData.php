<?php
    // headers needed to test from local host, maybe partially or completely removed
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    header("Access-Control-Allow-Origin: *");

    $filename = "ordered.json";
    // convert the expected json-string to a php-array
    $json = file_get_contents("php://input");
    
    // copy previous filestate with timestamp in backup-folder
    if (file_exists($filename)) {
        // make sure folder "backup" exists with write-access (777)
        copy($filename, "backup/" . $filename . "_" . filemtime($filename));
    }

    // store json in file
	$fileSave = fopen($filename, "w+") or die("Can't create ".$filename);
	fwrite($fileSave, $json);
    fclose($fileSave);
    print("Server received: \n");
	print($json);
?>