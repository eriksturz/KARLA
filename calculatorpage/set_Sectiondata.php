<?php
include("..\db_con\dbconnect.php");

function setSectiondata($mysqli, $Startaddress, $Goaladdress, $formattedDistance, $co2_emmisions, $vehicleID, $tripID, $userID)
{
    $stmt = $mysqli->prepare("INSERT INTO section (tripID, userID, vehicleID, sectionstart, sectiongoal, sectiondistance, sectionemissions) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iiissdd", $tripID, $userID, $vehicleID, $Startaddress, $Goaladdress, $formattedDistance, $co2_emmisions);

    if ($stmt->execute()) {
        echo "Daten erfolgreich gespeichert.";
    } else {
        die("Fehler beim Speichern der Daten: " . $stmt->error);
    }

    $stmt->close();
}

?>