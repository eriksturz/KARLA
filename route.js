function calculateRoute() {
    var startAddress = document.getElementById('Start').value;
    var goalAddress = document.getElementById('Goal').value;
    var selectedVehicle = document.getElementById('vehicle').value;

    var directionsService = new google.maps.DirectionsService();
    var map = new google.maps.Map(document.getElementById('map')); // Neue Karte erstellen
    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById('directionsPanel') // Reiseschritte anzeigen
    });

    // Löschen Sie die vorherige Wegbeschreibung
    directionsDisplay.set('directions', null);
    
    var request = {
        origin: startAddress,
        destination: goalAddress,
        travelMode: google.maps.TravelMode[selectedVehicle]
    };

    directionsService.route(request, function(response, status) {
        if (status === 'OK') {
            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map,
                panel: document.getElementById('directionsPanel') // Reiseschritte anzeigen
            });
            directionsDisplay.setDirections(response);

             // Zugriff auf die Route-Informationen
             var route = response.routes[0]; // Die erste (und möglicherweise einzige) Route
             var legs = route.legs; // Liste der Teilstrecken (Zwischenstopps)
 
             for (var i = 0; i < legs.length; i++) {
                 var leg = legs[i];
                 // Konvertieren Sie die Textwerte in Zahlen, wenn sie numerische Werte darstellen
                 var distanceNumeric = parseFloat(leg.distance.text.replace(' km', '')); // Entfernen Sie die Einheit (z.B. " km") und konvertieren Sie in eine Zahl
                 var durationNumeric = parseFloat(leg.duration.text.replace(' min', '')); // Entfernen Sie die Einheit (z.B. " min") und konvertieren Sie in eine Zahl
                 var steps = leg.steps; // Liste der Schritte
 
                 for (var j = 0; j < steps.length; j++) {
                     var step = steps[j];
                     // Ähnliche Konvertierung für Schritte, falls erforderlich
                     var stepDistanceNumeric = parseFloat(step.distance.text.replace(' km', ''));
                     var stepDurationNumeric = parseFloat(step.duration.text.replace(' min', ''));
                     var travelMode = step.travel_mode; // Fortbewegungsmittel für den Schritt (z.B. "DRIVING")
                     // Feinere Verkehrsmittelmodi abfragen, wenn verfügbar
                     if (step.travel_mode === 'TRANSIT') {
                        // Wenn es sich um Transit handelt, weitere Details abrufen
                        var transitDetails = step.transit;
                        var vehicle = transitDetails.line.vehicle.name; // Fahrzeugtyp (Bus, Zug, U-Bahn)

                        // Hier können Sie die Informationen weiterverarbeiten
                        console.log('Distance: ' + stepDistanceNumeric + ' km');
                        console.log('Duration: ' + stepDurationNumeric + ' min');
                        console.log('Travel Mode: ' + travelMode);
                        console.log('Vehicle: ' + vehicle);
                    }
                }
            }
        } else {
            alert('Route konnte nicht berechnet werden. Fehlercode: ' + status);
        }
    });
}

// Event-Handler für den "Route Berechnen"-Button
document.getElementById('calculateRouteButton').addEventListener('click', function() {
    calculateRoute();
});

