<?php
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
$tram = new Vehicle("Electricity", "0.0739", "Train (local)");
$train = new Vehicle("Electricity", "0.0461", "Train (long-distance)");
$bus = new Vehicle("gas", "0.0313", "Long-distance Bus");
$ebike = new Vehicle("electricity", "0.0152", "E-Bike");
$planeIN = new Vehicle("gas", "0.2182", "Plane (National)");
$planeOUT = new Vehicle("gas", "0.1976", "Plane (International)");
$videocall = new Vehicle("Electricity", "0.0897", "Online meeting"); 
$onfoot = new Vehicle("none", "0", "Walking");

?>