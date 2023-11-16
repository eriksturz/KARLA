function calculateRoute() {
  var startAddress = document.getElementById("Start").value;
  var goalAddress = document.getElementById("Goal").value;
  var selectedVehicle = document.getElementById("vehicle").value;
  console.log("Start der Route-Berechnung");
  console.log("Startadresse: " + startAddress);
  console.log("Zieladresse: " + goalAddress);
  console.log("Gewähltes Verkehrsmittel: " + selectedVehicle);

  var directionsService = new google.maps.DirectionsService();
  var map = new google.maps.Map(document.getElementById("map")); // Neue Karte erstellen
  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map,
    panel: document.getElementById("directionsPanel"), // Reiseschritte anzeigen
  });

  // Löschen Sie die vorherige Wegbeschreibung
  directionsDisplay.set("directions", null);

  var request = {
    origin: startAddress,
    destination: goalAddress,
    travelMode: google.maps.TravelMode[selectedVehicle],
  };

  directionsService.route(request, function (response, status) {
    if (status === "OK") {
      console.log("Route erfolgreich berechnet");

      var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById("directionsPanel"), // Reiseschritte anzeigen
      });
      directionsDisplay.setDirections(response);

      // Zugriff auf die Route-Informationen
      var route = response.routes[0]; // Die erste (und möglicherweise einzige) Route
      var legs = route.legs; // Liste der Teilstrecken (Zwischenstopps)

      for (var i = 0; i < legs.length; i++) {
        var leg = legs[i];
        // Konvertieren Sie die Textwerte in Zahlen, wenn sie numerische Werte darstellen
        var distanceNumeric = leg.distance.text; // Entfernen Sie die Einheit (z.B. " km") und konvertieren Sie in eine Zahl
        var durationNumeric = leg.duration.text; // Entfernen Sie die Einheit (z.B. " min") und konvertieren Sie in eine Zahl
        var totalDuration = leg.duration.text; // Gesamte Reisezeit
        var totalDistance = leg.distance.text; // Gesamte Entfernung
        var steps = leg.steps; // Liste der Schritte
        console.log("Schritt " + (i + 1) + ":");
        console.log("Distance: " + distanceNumeric);
        console.log("Duration: " + durationNumeric);
        console.log("Gesamte Reisezeit: " + totalDuration);
        console.log("Gesamte Entfernung: " + totalDistance);

        for (var j = 0; j < steps.length; j++) {
          var step = steps[j];
          var travelMode = step.travel_mode; // Fortbewegungsmittel für den Schritt (z.B. "DRIVING")
          var vehicleType = ""; //Variable für den Fahrzeugtyp
          console.log("Schritt " + (j + 1) + ":");
          console.log("Distanz: " + step.distance.text);
          console.log("Dauer: " + step.duration.text);
          console.log("Fortbewegungsmittel: " + step.travel_mode);
          if (travelMode === "TRANSIT") {
            var transitDetails = step.transit;
            vehicleType = transitDetails.line.vehicle.name;
            console.log("Vehicle Type: " + vehicleType);
          }
        }
      }
    } else {
      alert("Route konnte nicht berechnet werden. Fehlercode: " + status);
    }
  });
}

// Event-Handler für den "Route Berechnen"-Button
document
  .getElementById("calculateRouteButton")
  .addEventListener("click", function () {
    calculateRoute();
  });
