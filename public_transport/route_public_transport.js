var startInput = document.getElementById("Start");
var goalInput = document.getElementById("Goal");

var autocompleteStart = new google.maps.places.Autocomplete(startInput);
var autocompleteGoal = new google.maps.places.Autocomplete(goalInput);

var startAddress; // Variable zum Speichern der Startadresse
var goalAddress; // Variable zum Speichern der Zieladresse

// Funktion, um Eingabe in eine Adresse umzuwandeln
function convertInputToAddress(inputField, autocomplete) {
  var place = autocomplete.getPlace();
  if (place.formatted_address) {
    // Der Benutzer hat eine Auswahl aus den Vorschlägen getroffen oder die Eingabe wurde abgeschlossen
    // Setzen Sie das Input-Feld auf die ausgewählte Adresse
    inputField.value = place.formatted_address;
    // Speichern Sie die umgewandelte Adresse in der entsprechenden Variable
    if (inputField.id === "Start") {
      startAddress = inputField.value;
    } else if (inputField.id === "Goal") {
      goalAddress = inputField.value;
    }
  }
}

// Event-Handler für Startadresse
autocompleteStart.addListener("place_changed", function () {
  convertInputToAddress(startInput, autocompleteStart);
});

// Event-Handler für Zieladresse
autocompleteGoal.addListener("place_changed", function () {
  convertInputToAddress(goalInput, autocompleteGoal);
});

function calculateRoute() {
  var startAddress = startInput.value;
  var goalAddress = goalInput.value;
  var selectedVehicle = "TRANSIT";
  console.log("Start der Route-Berechnung");
  console.log("Startadresse: " + startAddress);
  console.log("Zieladresse: " + goalAddress);
  console.log("Gewähltes Verkehrsmittel: " + selectedVehicle);

  var startCity = extractCityFromAddress(autocompleteStart.getPlace());
  var goalCity = extractCityFromAddress(autocompleteGoal.getPlace());
  console.log("Stadt (Start): " + startCity);
  console.log("Stadt (Ziel): " + goalCity);

  var directionsService = new google.maps.DirectionsService();

  
  var request = {
    origin: startAddress,
    destination: goalAddress,
    travelMode: google.maps.TravelMode[selectedVehicle],
  };

  directionsService.route(request, function (response, status) {
    if (status === "OK") {
      console.log("Route erfolgreich berechnet");

      // Zugriff auf die Route-Informationen
      var route = response.routes[0]; // Die erste (und möglicherweise einzige) Route
      var legs = route.legs; // Liste der Teilstrecken (Zwischenstopps)

      for (var i = 0; i < legs.length; i++) {
        var leg = legs[i];
        var steps = leg.steps;
        // Konvertieren Sie die Textwerte in Zahlen, wenn sie numerische Werte darstellen
        var totalDistance = leg.distance.text; // Gesamte Entfernung
        var steps = leg.steps; // Liste der Schritte
        console.log("Gesamte Entfernung: " + totalDistance);

        for (var j = 0; j < steps.length; j++) {
          var step = steps[j];
          var travelMode = step.travel_mode; // Fortbewegungsmittel für den Schritt (z.B. "DRIVING")
          var vehicleType = ""; //Variable für den Fahrzeugtyp
          var trainstop = ""; // Variable für Zwischenstop
          console.log("Schritt " + (j + 1) + ":");
          console.log("Distanz: " + step.distance.text);
          console.log("Fortbewegungsmittel: " + step.travel_mode);
          if (travelMode === "TRANSIT") {
            var transitDetails = step.transit;
            vehicleType = transitDetails.line.vehicle.type;
            var trainstop = transitDetails.arrival_stop.name;
            console.log("Vehicle Type: " + vehicleType);
            console.log("Zwischenhaltestelle: " + trainstop);
          }
        }
      }
    } else {
      alert("Route konnte nicht berechnet werden. Fehlercode: " + status);
    }
  });
}

// Extrahieren Sie den Stadtnamen aus einem Place-Objekt
function extractCityFromAddress(place) {
  var addressComponents = place.address_components;
  var city = "";

  addressComponents.forEach(function (component) {
    var types = component.types;
    if (types.includes("locality")) {
      city = component.long_name;
    }
  });

  return city;
}

document
  .getElementById("calculateRouteButton")
  .addEventListener("click", function () {
    if (startAddress && goalAddress) {
      calculateRoute(startAddress, goalAddress);
    } else {
      alert("Bitte wählen Sie eine Adresse aus den Vorschlägen.");
    }
  });
