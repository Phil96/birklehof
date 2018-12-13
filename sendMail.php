<?php
    // headers needed to test from local host, maybe partially or completely removed
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    header("Access-Control-Allow-Origin: *");

    // convert the expected json-string to a php-array
    $json = file_get_contents("php://input");
    $data = json_decode($json);

    // create response- and mail-message
    print("Server received: \n");
    $message = $json;
    /* $message = "Hallo Tester,\n\n";
    foreach ($data as $key => $value) {
        $line = $key." : ".$value."\n";
        print($line);
        $message .= $line;
    } */

    // send mail via the (usually built-in) php smtp-mailer
    mail( "elisabeth.ilg@birklehof.de", "Birklehof Spende", $message, "From: elisabeth.ilg@birklehof.de");
?>