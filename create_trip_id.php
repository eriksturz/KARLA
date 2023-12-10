<?php
include("db_con\dbconnect.php");

session_start();
function generateNewTripID($mysqli, $lastname, $employeeID)
{
    // Create a new userID
    $stmt = $mysqli->prepare("SELECT MAX(userID) AS userID FROM user");


    if (!$stmt->execute()) {
        die("Error executing query: " . $stmt->error);
    }

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();


    if ($row['userID'] === NULL) {
        $userID = 1;
    } else {
        $userID = $row['userID'] + 1;
    }

    $stmt = $mysqli->prepare("INSERT INTO user (userID, last_name, employeeID) VALUES (?, ?, ?)");
    $stmt->bind_param("isi", $userID, $lastname, $employeeID);
    if (!$stmt->execute()) {
        die("Error saving data: " . $stmt->error);
    }
    $stmt->close();

    // Create a new tripID

    $stmt = $mysqli->prepare("SELECT MAX(tripID) AS tripID FROM trip");
    if (!$stmt->execute()) {
        die("Error executing query: " . $stmt->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();

    // If there are no records in the trip table, start with 1, otherwise increment the maximum tripID
    if ($row['tripID'] === NULL) {
        $tripID = 1;
    } else {
        $tripID = $row['tripID'] + 1;
    }

    // SQL query to insert the new tripID into the trip table
    $stmt = $mysqli->prepare("INSERT INTO trip (tripID, userID) VALUES (?, ?)");
    $stmt->bind_param("ii", $tripID, $userID);
    if (!$stmt->execute()) {
        die("Error saving data: " . $stmt->error);
    }
    $stmt->close();
       
    $_SESSION['tripID'] = $tripID;
    $_SESSION['userID'] = $userID;



}

?>