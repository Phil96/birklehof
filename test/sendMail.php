<?php
    // headers needed to test from local host, maybe partially or completely removed
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    header("Access-Control-Allow-Origin: *");

    // convert the expected json-string to a php-array
    $json = file_get_contents("php://input");
    $data = json_decode($json);

    $header = "From: philip.gnann@hs-furtwangen.de\r\n"; 
    //$header.= "CC: philipgnann@aol.com\r\n"; 
    $header.= "MIME-Version: 1.0\r\n"; 
    $header.= "Content-Type: text/plain; charset=utf-8\r\n"; 
    $header.= "X-Priority: 1\r\n"; 

    /* $header = 'From: philip.gnann@hs-furtwangen.de' . "\r\n" .
    'Reply-To: philip.gnann@hs-furtwangen.de' . "\r\n" .
    'X-Mailer: PHP/' . phpversion(); */

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
    mail( "elisabeth.ilg@birklehof.de", "Birklehof; Spende aus 3D-Modell", $message, $header);
?>