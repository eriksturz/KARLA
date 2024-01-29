<?php
include ("..\db_con\dbconnect.php");
function calculateVehicleEmissions($mysqli, $formattedDistance, $travelers, $selectedVehicle){   
    $stmt = $mysqli->prepare("SELECT co2_output, vehicleID FROM vehicle WHERE vehicle_type = ?");
    $stmt->bind_param("s", $selectedVehicle);
    if (!$stmt->execute()) {
        die("Error executing query: " . $stmt->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();

    $vehicleID = $row['vehicleID'];
    $co2_output = $row['co2_output'];


    if (!isset($travelers) || $travelers == 0) {
        $travelers = 1;
    }

    $factors = array(
        1 => 1,
        2 => 1.42,
        3 => 2.14,
        4 => 3.21,
        5 => 3.21
    );

    $factor = isset($factors[$travelers]) ? $factors[$travelers] : 1;

    if ($selectedVehicle == "DRIVING") {
        $co2_emmisions = ($co2_output / $factor) * $formattedDistance;
    } else {
        $co2_emmisions = $co2_output * $formattedDistance;
    }
    return array($co2_emmisions, $vehicleID);
}
?>