<?php
include("../db_con/dbconnect.php");
include("calculate_Vehicle_Emissions.php");
include("set_Sectiondata.php");
include("set_Tripdata.php");

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$userID = $_SESSION['userID'];
$tripID = $_SESSION['tripID'];
$travelers = $_SESSION['travelers'];

$Startaddress = mysqli_real_escape_string($mysqli, $data["Startadresse"]);
$Goaladdress = mysqli_real_escape_string($mysqli, $data["Zieladresse"]);
$distance = mysqli_real_escape_string($mysqli, $data["Gesammtdistanz"]);
$selectedVehicle = mysqli_real_escape_string($mysqli, $data["Fahrzeug"]);

$formattedDistance = number_format($distance, 2, '.', '');


if (!isset($data["Startadresse"], $data["Zieladresse"], $data["Gesammtdistanz"], $data["Fahrzeug"])) {
    die("Ein oder mehrere erforderliche POST-Variablen fehlen.");
}


list($co2_emmisions, $vehicleID) = calculateVehicleEmissions($mysqli, $formattedDistance, $travelers, $selectedVehicle);
setSectiondata($mysqli, $Startaddress, $Goaladdress, $formattedDistance, $co2_emmisions, $vehicleID, $tripID, $userID);
setTripData($mysqli, $tripID, $userID);

?>