<?php
include("..\db_con\dbconnect.php");

$query = "SELECT co2_output FROM vehicle WHERE vehicleID = ?"; // Ersetze "deine_tabelle" und "id" entsprechend deinem Datenbank- und Abfrageaufbau
$stmt = $mysqli->prepare($query);
$vehicleID = 1;
$stmt->bind_param("i", $vehicleID);
$stmt->execute();
$stmt->bind_result($co2_output);
$stmt->fetch();
$stmt->close();


$startAddress = mysqli_real_escape_string($mysqli, $_POST["Startadresse"]);
$goalAddress = mysqli_real_escape_string($mysqli, $_POST["Zieladresse"]);
$selectedPersons = mysqli_real_escape_string($mysqli, $_POST["Mitfahrer"]);
$distance = mysqli_real_escape_string($mysqli, $_POST["Gesammtdistanz"]);
$formattedDistance = number_format($distance, 2, '.', '');
$formattedPersons = number_format($selectedPersons, 2, '.', '');
$co2_emmisions = $co2_output * $formattedDistance / $formattedPersons;

if (!isset($_POST["Startadresse"], $_POST["Zieladresse"], $_POST["Gesammtdistanz"])) {
    die("Ein oder mehrere erforderliche POST-Variablen fehlen.");
} 



// SQL-Abfrage zum Einfügen der Daten in die Datenbank

$stmt = $mysqli->prepare("INSERT INTO trip (startaddress, goaladdress, distance, co2_emmisions) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssdd", $startAddress, $goalAddress, $formattedDistance, $co2_emmisions);

if ($stmt->execute()) {
    echo "Daten erfolgreich gespeichert.";
} else {
    die("Fehler beim Speichern der Daten: " . $stmt->error);
}

$stmt->close();
?>