

function initMap() {
    var karte = new google.maps.Map(document.getElementById('karte'), {
        zoom: 14,
        center: { lat: 49.00681, lng: 8.40198 }
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(karte);

    var startInput = document.getElementById('start');
    var zielInput = document.getElementById('ziel');

    var autocompleteStart = new google.maps.places.Autocomplete(startInput);
    var autocompleteZiel = new google.maps.places.Autocomplete(zielInput);

    autocompleteStart.addListener('place_changed', function () {
        if (startInput.value !== '' && zielInput.value !== '') {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        }
    });

    autocompleteZiel.addListener('place_changed', function () {
        if (startInput.value !== '' && zielInput.value !== '') {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        }
    });
}
