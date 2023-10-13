function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var start = document.getElementById('start').value;
    var ziel = document.getElementById('ziel').value;
    var selectedMode = document.getElementById('verkehrsmittel').value;

    var request = {
        origin: start,
        destination: ziel,
        travelMode: selectedMode,
    };

    // Wenn "Öffentliche Verkehrsmittel" ausgewählt ist, füge transitOptions hinzu
    if (selectedMode === 'TRANSIT') {
        request.TransitOptions = {
            modes: ['BUS','RAIL', 'SUBWAY', 'TRAIN','TRAM']  // Du kannst hier weitere Verkehrsmittel wie 'RAIL' hinzufügen
        };
    }

    directionsService.route(request, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
