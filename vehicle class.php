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
$car = new Vehicle("gas", "0.1945", "Auto");
$tram = new Vehicle("Electricity", "0.0739", "Zug (Nahverkehr)");
$train = new Vehicle("Electricity", "0.0461", "Zug (Fernverkehr)");
$bus = new Vehicle("gas", "0.0313", "Fernlinienbus");
$ebike = new Vehicle("electricity", "0.0152", "E-Bike");
$planeIN = new Vehicle("gas", "0.2182", "Flugzeug (National)");
$planeOUT = new Vehicle("gas", "0.1976", "Flugzeug (International)");
$videocall = new Vehicle("Electricity", "0.0897", "Video Konferenz"); 

// Array für Dropdownbutton
$vehicles = array(
    array("value" => $car->CO2OUT, "CO2OOUT" => $car->CO2OUT, "vtype" => $car->vtype),
    array("value" => $tram->CO2OUT, "CO2OUT" => $tram->CO2OUT, "vtype" => $tram->vtype),
    array("value" => $train->CO2OUT, "CO2OUT" => $train->CO2OUT, "vtype" => $train->vtype),
    array("value" => $bus->CO2OUT, "CO2OUT" => $bus->CO2OUT, "vtype" => $bus->vtype),
    array("value" => $ebike->CO2OUT, "CO2OUT" => $ebike->CO2OUT, "vtype" => $ebike->vtype),
    array("value" => $planeIN->CO2OUT, "CO2OUT" => $planeIN->CO2OUT, "vtype" => $planeIN->vtype),
    array("value" => $planeOUT->CO2OUT, "CO2OUT" => $planeOUT->CO2OUT, "vtype" => $planeOUT->vtype),
    array("value" => $videocall->CO2OUT, "CO2OUT" => $videocall->CO2OUT, "vtype" => $videocall->vtype),
);

echo json_encode($vehicles);
?>
