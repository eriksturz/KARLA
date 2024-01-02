<?php
include("db_con\dbconnect.php");

session_start();

function getMaxId($mysqli, $tableName, $idName) {
    $stmt = $mysqli->prepare("SELECT MAX($idName) AS $idName FROM $tableName");
    if (!$stmt->execute()) {
        die("Error executing query: " . $stmt->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();
    return $row[$idName] === NULL ? 1 : $row[$idName] + 1;
}

function insertUser($mysqli, $userID, $lastname, $employeeID) {
    $stmt = $mysqli->prepare("INSERT INTO user (userID, last_name, employeeID) VALUES (?, ?, ?)");
    $stmt->bind_param("isi", $userID, $lastname, $employeeID);
    if (!$stmt->execute()) {
        die("Error saving data: " . $stmt->error);
    }
    $stmt->close();
}

function insertTrip($mysqli, $tripID, $userID) {
    $stmt = $mysqli->prepare("INSERT INTO trip (tripID, userID) VALUES (?, ?)");
    $stmt->bind_param("ii", $tripID, $userID);
    if (!$stmt->execute()) {
        die("Error saving data: " . $stmt->error);
    }
    $stmt->close();
}

function createUserandTrip($mysqli, $lastname, $employeeID)
{
    // Create a new userID
    $userID = getMaxId($mysqli, 'user', 'userID');
    insertUser($mysqli, $userID, $lastname, $employeeID);

    // Create a new tripID
    $tripID = getMaxId($mysqli, 'trip', 'tripID');
    insertTrip($mysqli, $tripID, $userID);

    $_SESSION['tripID'] = $tripID;
    $_SESSION['userID'] = $userID;
}

?>