<?php
include("../db_con/dbconnect.php");

function getVehicleData($mysqli, $selectedVehicle)
{
    $vehicleID = null;
    $co2_output = null;
    $query = "SELECT vehicleID, co2_output FROM vehicle WHERE vehicle_type = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("s", $selectedVehicle);
    if (!$stmt->execute()) {
        die("Error executing query: " . $stmt->error);
    }
    $stmt->bind_result($vehicleID, $co2_output);
    if (!$stmt->fetch()) {
        die("No data returned from the database.");
    }
    $stmt->close();
    return array($vehicleID, $co2_output);
}

// Kann voraussichtlich gelöscht werden!
?>