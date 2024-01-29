<?php
include("../db_con/dbconnect.php");
session_start();

function getDatafromTrip($mysqli, $tripID, $userID)
{
    
    $distance = null;
    $co2_emissions = null;
    $startaddress = null;
    $goaladdress = null;
    $stmt = $mysqli->prepare("SELECT distance, co2_emissions, startaddress, goaladdress FROM trip WHERE tripID = ? AND userID = ?");
    $stmt->bind_param("ii", $tripID, $userID);
    if (!$stmt->execute()) {
        echo json_encode(array('error' => 'Error executing query: ' . $stmt->error));
        exit;
    }
    $stmt->bind_result($distance, $co2_emissions, $startaddress, $goaladdress);
    if (!$stmt->fetch()) {
        echo json_encode(array('error' => 'Error fetching result: ' . $stmt->error));
        exit;
    }
    $stmt->close();

    // Debugging: output the distance and co2_output
    error_log("Distance: " . $distance . ", CO2 output: " . $co2_emissions . ", Startaddress: " . $startaddress . ", Goaladdress: " . $goaladdress);
    return array('distance' => $distance, 'co2_emissions' => $co2_emissions, 'startaddress' => $startaddress, 'goaladdress' => $goaladdress);
}



$data = getDatafromTrip($mysqli, $_SESSION['tripID'], $_SESSION['userID']);
echo json_encode($data);
// $_SESSION['tripID'], $_SESSION['userID']
?>
