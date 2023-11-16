var startInput = document.getElementById("Start");
var goalInput = document.getElementById("Goal");
var xhr = new XMLHttpRequest();
// Optionen für die Autocomplete-Objekte
var autocompleteOptions = {
  types: ["airport"],
};

var autocompleteStart = new google.maps.places.Autocomplete(
  startInput,
  autocompleteOptions
);
var autocompleteGoal = new google.maps.places.Autocomplete(
  goalInput,
  autocompleteOptions
);

var startCoords; // Variable zum Speichern der Startkoordinaten
var goalCoords; // Variable zum Speichern der Zielkoordinaten

// Funktion, um Eingabe in eine Adresse umzuwandeln
function convertInputToCoords(inputField, autocomplete) {
  var place = autocomplete.getPlace();
  if (place.geometry && place.geometry.location) {
    // Der Benutzer hat eine Auswahl aus den Vorschlägen getroffen oder die Eingabe wurde abgeschlossen
    // Speichern Sie die Koordinaten in der entsprechenden Variable
    if (inputField.id === "Start") {
      startCoords = place.geometry.location;
    } else if (inputField.id === "Goal") {
      goalCoords = place.geometry.location;
    }
  }
}

// Event-Handler für Startadresse
autocompleteStart.addListener("place_changed", function () {
  convertInputToCoords(startInput, autocompleteStart);
});

// Event-Handler für Zieladresse
autocompleteGoal.addListener("place_changed", function () {
  convertInputToCoords(goalInput, autocompleteGoal);
});

function calculateAirDistance() {
  console.log("Start der Luftlinienentfernungsberechnung");

  if (startCoords && goalCoords) {
    var startPlace = autocompleteStart.getPlace();
    var goalPlace = autocompleteGoal.getPlace();

    var startLocationInfo = extractCityAndCountry(startPlace);
    var goalLocationInfo = extractCityAndCountry(goalPlace);
    var startCountry = startLocationInfo.country;
    var goalCountry = goalLocationInfo.country;

    console.log("Abflugstadt: " + startLocationInfo.city);
    console.log("Abflugland: " + startLocationInfo.country);
    console.log("Zielstadt: " + goalLocationInfo.city);
    console.log("Zielland: " + goalLocationInfo.country);

    var airDistance = google.maps.geometry.spherical.computeDistanceBetween(
      startCoords,
      goalCoords
    );

    var airDistanceInKilometers = airDistance / 1000;
    console.log(
      "Luftlinienentfernung: " + airDistanceInKilometers.toFixed(2));
    sendValuesToPHP(startCountry, goalCountry, airDistanceInKilometers);
  } else {
    alert("Bitte wählen Sie eine Adresse aus den Vorschlägen.");
  }
}

function extractCityAndCountry(place) {
  var addressComponents = place.address_components;
  var city = "";
  var country = "";

  addressComponents.forEach(function (component) {
    var types = component.types;
    if (types.includes("locality")) {
      city = component.long_name;
    } else if (types.includes("country")) {
      country = component.long_name;
    }
  });

  return {
    city: city,
    country: country,
  };
}

// Funktion zum Senden der Werte an die PHP-Datei
function sendValuesToPHP(startCountry, goalCountry, airDistanceInKilometers) {
  xhr.open("POST", "route_by_car.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Daten, die gesendet werden sollen
  var postData =
    "Startadresse=" +
    startCountry +
    "&Zieladresse=" +
    goalCountry +
    "&Gesammtdistanz=" +
    airDistanceInKilometers;
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
  .getElementById("calculateAirDistanceButton")
  .addEventListener("click", function () {
    calculateAirDistance(); // Berechnen Sie die Luftlinienentfernung zwischen den Flughäfen
  });
