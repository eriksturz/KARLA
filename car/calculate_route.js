import { sendCitys, getpersons } from "./get_params";

export function calculateRoute() {
    var { startCity, goalCity } = sendCitys();
    //var startAddress = startInput.value;
    //var goalAddress = goalInput.value;
    var {selectedPersons} = getpersons();
    var selectedVehicle = "DRIVING"; // Das Verkehrsmittel ist immer "Auto"
  
    console.log("Mitfahrer: " + selectedPersons);
    console.log("Start der Route-Berechnung");
    console.log("Startadresse: " + startCity);
    console.log("Zieladresse: " + goalCity);
    console.log("Gewähltes Verkehrsmittel: " + selectedVehicle);
    
  
    var service = new google.maps.DistanceMatrixService();
  
    service.getDistanceMatrix(
      {
        origins: [startCity],
        destinations: [goalCity],
        travelMode: google.maps.TravelMode[selectedVehicle],
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      function (response, status) {
        if (status === "OK") {
          var elements = response.rows[0].elements[0];
          var distanceText = elements.distance.text;
          var distance = parseFloat(
            distanceText.replace(",", ".").replace(" km", "")
          );
          console.log("Gesamte Entfernung: " + distance);
          console.log("Gesamte Entfernung mit km: " + distanceText);
  
          // Hier die Werte an die PHP-Datei senden
          sendValuesToPHP(startAddress, goalAddress, distance, selectedPersons);
        } else {
          alert(
            "Entfernungsmatrix konnte nicht abgerufen werden. Fehlercode: " +
              status
          );
        }
      }
    );
  }