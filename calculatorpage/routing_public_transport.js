import { sendValuesToPHP } from "./send_to_php.js";

export function routing_by_rail(
  directionsService,
  Startaddress,
  Goaladdress,
  selectedVehicle,
  travelers,
  returnT
) {
  var destinations = Goaladdress.lat + "," + Goaladdress.lng;
  if (returnT) {
    destinations.push(Startaddress.lat + "," + Startaddress.lng);
  }
  console.log("routing_on_street wurde aufgerufen");
  var totalTransitDistance = 0;

  // Erstellen Sie ein neues Promise
  return new Promise((resolve, reject) => {
    var directionsService = new google.maps.DirectionsService();
    console.log("Origins: ", Startaddress.lat + "," + Startaddress.lng);
    console.log("Destinations: ", Goaladdress.lat + "," + Goaladdress.lng);
    directionsService.route(
      {
        origin: Startaddress.lat + "," + Startaddress.lng,
        destination: destinations,
        travelMode: google.maps.TravelMode[selectedVehicle],
      },
      async function (response, status) {
        if (status === "OK") {
          var steps = response.routes[0].legs[0].steps;

          for (var i = 0; i < steps.length; i++) {
            var step = steps[i];

            if (step.travel_mode == "TRANSIT") {
              totalTransitDistance += parseFloat(step.distance.value);

              console.log("Schritt " + (i + 1));
              console.log("Distanz:", step.distance.text);
              console.log("Verkehrsmittel:", step.travel_mode);
              console.log("Linie:", step.transit.line.short_name);
              console.log("Fahrzeug:", step.transit.line.vehicle.name);
            }
          }
          if (totalTransitDistance <= 100) {
            selectedVehicle = "LOCALTRAIN";
          } else {
            selectedVehicle = "LONGDISTANCETRAIN";
          }
          // Sie können die Entfernung hier weiterverarbeiten
          await sendValuesToPHP({
            Startadresse: Startaddress.formatted_address,
            Zieladresse: Goaladdress.formatted_address,
            Mitfahrer: travelers,
            Fahrzeug: selectedVehicle,
            Gesammtdistanz: totalTransitDistance / 1000,
          }, 'send_data_to_database.php');

          // Lösen Sie das Promise auf, wenn der Callback aufgerufen wird
          resolve();
        } else {
          alert(
            "Routeninformationen konnten nicht abgerufen werden. Fehlercode: " +
              status
          );

          // Weisen Sie das Promise ab, wenn ein Fehler auftritt
          reject(status);
        }
      }
    );
  });
}
