<?php
include("..\db_con\config.php");

// Verbindung zur Datenbank herstellen
$mysqli = new mysqli($host, $user, $pass, $dbname);

// Überprüfen, ob die Verbindung erfolgreich war
if ($mysqli->connect_error) {
    die('Verbindung zur Datenbank fehlgeschlagen: ' . $mysqli->connect_error);
} else {
    echo "erfolgreich"; }
?>