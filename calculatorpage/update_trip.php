<?php
session_start();
function updateTrip($mysqli, $tripID, $userID) {
    $stmt = $mysqli->prepare("SELECT SUM(sectionemissions), SUM(sectiondistance) FROM section WHERE tripID = ? AND userID = ?");
    $stmt->bind_param("ii", $tripID, $userID);
    if (!$stmt->execute()) {
        die("Error executing query: " . $stmt->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();

    // Get the first start address
    $stmt = $mysqli->prepare("SELECT sectionstart FROM section WHERE tripID = ? AND userID = ? ORDER BY sectionID ASC LIMIT 1");
    $stmt->bind_param("ii", $tripID, $userID);
    if (!$stmt->execute()) {
        die("Error executing query: " . $stmt->error);
    }
    $resultStart = $stmt->get_result();
    $rowStart = $resultStart->fetch_assoc();
    $stmt->close();


    // Get the last goal address

    $stmt = $mysqli->prepare("SELECT sectiongoal FROM section WHERE tripID = ? AND userID = ? ORDER BY sectionID DESC LIMIT 1");
    $stmt->bind_param("ii", $tripID, $userID);
    if (!$stmt->execute()) {
        die("Error executing query: " . $stmt->error);
    }
    $resultGoal = $stmt->get_result();
    $rowGoal = $resultGoal->fetch_assoc();
    $stmt->close();

    $stmt = $mysqli->prepare("UPDATE trip SET co2_emissions = ?, distance = ?, startaddress = ?, goaladdress = ? WHERE tripID = ? AND userID = ?");
    $stmt->bind_param("ddssii", $row['SUM(sectionemissions)'], $row['SUM(sectiondistance)'], $rowStart['sectionstart'], $rowGoal['sectiongoal'], $tripID, $userID);
    if (!$stmt->execute()) {
        die("Error saving data: " . $stmt->error);
    }
    $stmt->close();
}

?>