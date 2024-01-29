<?php
include("db_con\dbconnect.php");
include("getID_setUserTrip.php");

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$lastname = mysqli_real_escape_string($mysqli, $data["lastname"]);
$employeeID = (int) $data["employeeID"];
$travelers = (int) $data["travelers"];

if (!isset($data["lastname"], $data["employeeID"], $data["travelers"])) {
    die("Ein oder mehrere erforderliche POST-Variablen fehlen.");
}

createUserandTrip($mysqli, $lastname, $employeeID, $travelers);
?>