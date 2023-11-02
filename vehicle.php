<?php
$host = 'localhost'; // Hostname des MySQL-Servers
$user = 'root'; // Benutzername für die Datenbank
$pass = 'test'; // Passwort für die Datenbank
$dbname = 'karla'; // Name der Datenbank

// Verbindung zur Datenbank herstellen
$mysqli = new mysqli($host, $user, $pass, $dbname);

// Überprüfen, ob die Verbindung erfolgreich war
if ($mysqli->connect_error) {
    die('Verbindung zur Datenbank fehlgeschlagen: ' . $mysqli->connect_error);
}
else echo "erfolgreich";

class Vehicle {
    public string $fuel;
    public float $CO2OUT;
    public string $vtype;

    public function __construct($fuel, $CO2OUT, $vtype) {
        $this->fuel = $fuel;
        $this->CO2OUT = $CO2OUT;
        $this->vtype = $vtype;
    }
}

// Objekte
$car = new Vehicle("gas", "0.1945", "Car");
$tram = new Vehicle("electricity", "0.0739", "Train (local)");
$train = new Vehicle("electricity", "0.0461", "Train (long-distance)");
$bus = new Vehicle("gas", "0.0313", "Long-distance Bus");
$ebike = new Vehicle("electricity", "0.0152", "E-Bike");
$planeIN = new Vehicle("gas", "0.2182", "Plane (National)");
$planeOUT = new Vehicle("gas", "0.1976", "Plane (International)");
$videocall = new Vehicle("Electricity", "0.0897", "Online meeting"); 
$onfoot = new Vehicle("none", "0", "Walking");


$vehicles = [$car, $tram, $train, $bus, $ebike, $planeIN, $planeOUT, $videocall, $onfoot];

// Schleife, um jedes Fahrzeug in die Datenbank einzufügen
foreach ($vehicles as $vehicle) {
    $fuel = $vehicle->fuel;
    $co2_output = $vehicle->CO2OUT;
    $vehicle_type = $vehicle->vtype;

    // SQL-Befehl zur Überprüfung, ob das Element bereits existiert
    $check_sql = "SELECT vehicleID FROM vehicle WHERE fuel = '$fuel' AND co2_output = $co2_output AND vehicle_type = '$vehicle_type'";

    $result = $mysqli->query($check_sql);

    if ($result->num_rows == 0) {
        // Das Element existiert noch nicht, daher können wir es hinzufügen
        // SQL-Befehl zum Einfügen von Daten
        $insert_sql = "INSERT INTO vehicle (fuel, co2_output, vehicle_type) VALUES ('$fuel', $co2_output, '$vehicle_type')";

        if ($mysqli->query($insert_sql) === true) {
            echo "Daten für $vehicle_type wurden erfolgreich hinzugefügt.<br>";
        } else {
            echo "Fehler beim Hinzufügen von Daten für $vehicle_type: " . $mysqli->error . "<br>";
        }
    } else {
        echo "$vehicle_type existiert bereits in der Datenbank und wird übersprungen.<br>";
    }

    // Freigabe des Resultsets
    $result->close();
}

// Datenbankverbindung schließen
$mysqli->close();
?>


