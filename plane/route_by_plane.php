<?php
include("..\db_con\dbconnect.php");

if ($startCountry === $goalCountry) {
    $vehicleID = 6;
} else {
    $vehicleID = 7;
}

$startCountry = mysqli_real_escape_string($mysqli, $_POST["Startadresse"]);
$goalCountry = mysqli_real_escape_string($mysqli, $_POST["Zieladresse"]);
$airdistanceInKilometers = mysqli_real_escape_string($mysqli, $_POST["Gesammtdistanz"]);

$query = "SELECT co2_output FROM vehicle WHERE vehicleID = ?"; // Ersetze "deine_tabelle" und "id" entsprechend deinem Datenbank- und Abfrageaufbau
$stmt = $mysqli->prepare($query);
$stmt->bind_param("i", $vehicleID);
$stmt->execute();
$stmt->bind_result($co2_output);
$stmt->fetch();
$stmt->close();



$formattedDistance = number_format($airdistanceInKilometers, 2, '.', '');
$co2_emmisions = $co2_output * $formattedDistance;

if (isset($_POST["Startadresse"], $_POST["Zieladresse"], $_POST["Gesammtdistanz"])) {

} else {
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