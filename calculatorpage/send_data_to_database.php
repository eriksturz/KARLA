<?php
include("../db_con/dbconnect.php");
include("calculate_co2.php");
include("send_to_section.php");
include("update_trip.php");

// Lesen Sie die JSON-Daten aus dem php://input-Stream
$json = file_get_contents('php://input');

// Wandeln Sie die JSON-Daten in ein PHP-Array um
$data = json_decode($json, true);

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
$userID = $_SESSION['userID'];
$tripID = $_SESSION['tripID'];

$Startaddress = mysqli_real_escape_string($mysqli, $data["Startadresse"]);
$Goaladdress = mysqli_real_escape_string($mysqli, $data["Zieladresse"]);
$travelers = mysqli_real_escape_string($mysqli, $data["Mitfahrer"]);
$distance = mysqli_real_escape_string($mysqli, $data["Gesammtdistanz"]);
$selectedVehicle = mysqli_real_escape_string($mysqli, $data["Fahrzeug"]);

$formattedDistance = number_format($distance, 2, '.', '');
$formattedPersons = number_format($travelers, 2, '.', '');

if (!isset($data["Startadresse"], $data["Zieladresse"], $data["Gesammtdistanz"], $data["Fahrzeug"], $data["Mitfahrer"])) {
    die("Ein oder mehrere erforderliche POST-Variablen fehlen.");
}


list($co2_emmisions, $vehicleID) = calculateCo2($mysqli, $formattedDistance, $formattedPersons, $selectedVehicle);
sendSectiondata($mysqli, $Startaddress, $Goaladdress, $formattedDistance, $co2_emmisions, $vehicleID, $tripID, $userID);
updateTrip($mysqli, $tripID, $userID);

?>