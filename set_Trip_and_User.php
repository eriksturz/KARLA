<?php

include("db_con\dbconnect.php");
include ("create_trip_id.php");

// Lesen Sie die JSON-Daten aus dem php://input-Stream
$json = file_get_contents('php://input');

// Wandeln Sie die JSON-Daten in ein PHP-Array um
$data = json_decode($json, true);


$lastname = mysqli_real_escape_string($mysqli, $data["lastname"]);
$employeeID = (int)$data["employeeID"];

if (!isset($data["lastname"], $data["employeeID"])) {
    die("Ein oder mehrere erforderliche POST-Variablen fehlen.");
}

generateNewTripID($mysqli, $lastname, $employeeID);

?>