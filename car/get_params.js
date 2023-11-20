/*var selectedPersons = document.getElementById("persons").value;
var startInput = document.getElementById("Start");
var goalInput = document.getElementById("Goal");

var autocompleteStart = new google.maps.places.Autocomplete(startInput);
var autocompleteGoal = new google.maps.places.Autocomplete(goalInput);

// Event-Handler für Startadresse
autocompleteStart.addListener("place_changed", function () {
  convertInputToAddress(startInput, autocompleteStart);
});

// Event-Handler für Zieladresse
autocompleteGoal.addListener("place_changed", function () {
  convertInputToAddress(goalInput, autocompleteGoal);
});

var startAddress;
var goalAddress;

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

// Hier fügen Sie den Code zum Extrahieren der Stadt aus der Adresse hinzu
var startCity = extractCityFromAddress(autocompleteStart.getPlace());
var goalCity = extractCityFromAddress(autocompleteGoal.getPlace());

// Funktion, um die Adresse zurückzugeben --> Export in calculate_route.js
function getAddressesandCitys() {
  return { startAddress, goalAddress, startCity, goalCity };
}

export { getAddressesandCitys };


function getpersons() {
  return { selectedPersons };
}

export {getpersons}; */

// Funktion zum Extrahieren von Ortsteilen aus einem Place-Objekt basierend auf dem Typ
function extractComponentFromAddress(place, componentType) {
  var addressComponents = place.address_components;
  var componentValue = "";

  addressComponents.forEach(function (component) {
    var types = component.types;
    if (types.includes(componentType)) {
      componentValue = component.long_name;
    }
  });

  return componentValue;
}

var startInput = document.getElementById("Start");
var goalInput = document.getElementById("Goal");

var autocompleteStart = new google.maps.places.Autocomplete(startInput);
var autocompleteGoal = new google.maps.places.Autocomplete(goalInput);

// Event-Handler für Startadresse
autocompleteStart.addListener("place_changed", function () {
  convertInputToAddress(startInput, autocompleteStart);
});

// Event-Handler für Zieladresse
autocompleteGoal.addListener("place_changed", function () {
  convertInputToAddress(goalInput, autocompleteGoal);
});
// Funktion, um Eingabe in eine Adresse umzuwandeln und Ortsteile zu extrahieren
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

// Extrahiere Stadtnamen
var startCity = extractComponentFromAddress(place, "locality");
var goalCity = extractComponentFromAddress(place, "locality");

var startCountry = extractComponentFromAddress(place, "country");
var goalCountry = extractComponentFromAddress(place, "country");

function getpersons () {
  var selectedPersons = document.getElementById("persons");
  {selectedPersons};
}

export {getpersons};


function sendCitys () {
  {startCity, goalCity};
}

export {sendCitys};


function sendCountrys () {
  { startCountry, goalCountry};
}

export {sendCountrys};