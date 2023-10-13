// Inhalt von googlemaps.js

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var karte = new google.maps.Map(document.getElementById('karte'), {
        zoom: 14,
        center: {lat: 49.00681, lng: 8.40198}  // Hier kannst du das Zentrum der Karte anpassen
    });

    directionsDisplay.setMap(karte);

    var startInput = document.getElementById('start');
    var zielInput = document.getElementById('ziel');

    var autocompleteStart = new google.maps.places.Autocomplete(startInput);
    var autocompleteZiel = new google.maps.places.Autocomplete(zielInput);

    autocompleteStart.addListener('place_changed', function() {
        // Die Berechnung der Route wird nur durchgeführt, wenn beide Felder ausgefüllt sind
        if (startInput.value !== '' && zielInput.value !== '') {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        }
    });

    autocompleteZiel.addListener('place_changed', function() {
        // Die Berechnung der Route wird nur durchgeführt, wenn beide Felder ausgefüllt sind
        if (startInput.value !== '' && zielInput.value !== '') {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        }
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var start = document.getElementById('start').value;
    var ziel = document.getElementById('ziel').value;

    directionsService.route({
        origin: start,
        destination: ziel,
        travelMode: 'DRIVING'  // Hier kannst du das Verkehrsmittel anpassen
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
