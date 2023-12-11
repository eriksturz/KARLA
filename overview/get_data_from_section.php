<?php
include("../db_con/dbconnect.php");
session_start();
function getDatafromSection($mysqli, $tripID, $userID)
{
    $sectionstart = null;
    $sectiongoal = null;
    $sectiondistance = null;
    $sectionemissions = null;
    $vehicleName = null;

    $stmt = $mysqli->prepare("SELECT section.sectionstart, section.sectiongoal, section.sectiondistance, section.sectionemissions, vehicle.name FROM section INNER JOIN vehicle ON section.vehicleID = vehicle.vehicleID WHERE section.tripID = ? AND section.userID = ?");
    $stmt->bind_param("ii", $tripID, $userID);
    if (!$stmt->execute()) {
        echo json_encode(array('error' => 'Error executing query: ' . $stmt->error));
        exit;
    }
    $stmt->bind_result($sectionstart, $sectiongoal, $sectiondistance, $sectionemissions, $vehicleName);

    $results = array();
    while ($stmt->fetch()) {
        $results[] = array(
            'sectionstart' => $sectionstart,
            'sectiongoal' => $sectiongoal,
            'sectiondistance' => $sectiondistance,
            'sectionemissions' => $sectionemissions,
            'vehicleName' => $vehicleName
        );
    }
    $stmt->close();

    return $results;
}

$data = getDatafromSection($mysqli, $_SESSION['tripID'], $_SESSION['userID']);
echo json_encode($data);
?>