var startInput = document.getElementById("Start");
var goalInput = document.getElementById("Goal");
var xhr = new XMLHttpRequest();

var autocompleteStart = new google.maps.places.Autocomplete(startInput);
var autocompleteGoal = new google.maps.places.Autocomplete(goalInput);

var startAddress; // Variable zum Speichern der Startadresse
var goalAddress; // Variable zum Speichern der Zieladresse

// Funktion, um Eingabe in eine Adresse umzuwandeln
function convertInputToAddress(inputField, autocomplete) {
  var place = autocomplete.getPlace();
  if (place.formatted_address) {
    // Der Benutzer hat eine Auswahl aus den Vorschlägen getroffen oder die Eingabe wurde abgeschlossen
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
  var selectedVehicle = "DRIVING"; // Das Verkehrsmittel ist immer "Auto"
  var selectedPersons = document.getElementById("persons").value;

  // Hier fügen Sie den Code zum Extrahieren der Stadt aus der Adresse hinzu
  var startCity = extractCityFromAddress(autocompleteStart.getPlace());
  var goalCity = extractCityFromAddress(autocompleteGoal.getPlace());

  console.log("Mitfahrer: " + selectedPersons);
  console.log("Start der Route-Berechnung");
  console.log("Startadresse: " + startAddress);
  console.log("Zieladresse: " + goalAddress);
  console.log("Gewähltes Verkehrsmittel: " + selectedVehicle);
  console.log("Stadt (Start): " + startCity);
  console.log("Stadt (Ziel): " + goalCity);

  var service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
      origins: [startAddress],
      destinations: [goalAddress],
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

// Funktion zum Senden der Werte an die PHP-Datei
function sendValuesToPHP(startAddress, goalAddress, distance, selectedPersons) {
  xhr.open("POST", "route_by_car.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Daten, die gesendet werden sollen
  var postData =
    "Startadresse=" +
    startAddress +
    "&Zieladresse=" +
    goalAddress +
    "&Gesammtdistanz=" +
    distance +
    "&Mitfahrer=" +
    selectedPersons;

  // Callback-Funktion für den Abschluss der Anfrage
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Antwort vom Server
      console.log(xhr.responseText);
    }
  };

  // Daten senden
  xhr.send(postData);
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
