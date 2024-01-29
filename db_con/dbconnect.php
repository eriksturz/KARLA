<?php
include("config.php");

$mysqli = new mysqli($host, $user, $pass, $dbname);

if ($mysqli->connect_error) {
    die('Verbindung zur Datenbank fehlgeschlagen: ' . $mysqli->connect_error);
} 
?>