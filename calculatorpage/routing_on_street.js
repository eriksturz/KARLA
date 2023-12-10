import { sendValuesToPHP } from "./send_to_php.js";

export function routing_on_street(
  serviceMatrix,
  Startaddress,
  Goaladdress,
  selectedVehicle,
  travelers,
  returnT
) {
  console.log("routing_on_street wurde aufgerufen");
 var destinations = [Goaladdress.lat + "," + Goaladdress.lng];
 if (returnT) {destinations.push(Startaddress.lat + "," + Startaddress.lng);}
  // Erstellen Sie ein neues Promise
  return new Promise((resolve, reject) => {
    console.log("Origins: ", Startaddress.lat + "," + Startaddress.lng);
    console.log("Destinations: ", Goaladdress.lat + "," + Goaladdress.lng);
    serviceMatrix.getDistanceMatrix(
      {
        origins: [Startaddress.lat + "," + Startaddress.lng],
        destinations: destinations,
        travelMode: google.maps.TravelMode[selectedVehicle],
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      async function callback(response, status) {
        console.log("Response: ", response);
        if (status === "OK") {
          var distanceText = response.rows[0].elements[0].distance.text;
          var distance = parseFloat(
            distanceText.replace(",", ".").replace(" km", "")
          );

          // Sie können die Entfernung hier weiterverarbeiten
          await sendValuesToPHP({
            Startadresse: Startaddress.formatted_address,
            Zieladresse: Goaladdress.formatted_address,
            Mitfahrer: travelers,
            Fahrzeug: selectedVehicle,
            Gesammtdistanz: distance,
          }, 'send_data_to_database.php');
          console.log(Startaddress, Goaladdress, selectedVehicle, travelers);

          // Lösen Sie das Promise auf, wenn der Callback aufgerufen wird
          resolve();
        } else {
          alert(
            "Entfernungsmatrix konnte nicht abgerufen werden. Fehlercode: " +
              status
          );

          // Weisen Sie das Promise ab, wenn ein Fehler auftritt
          reject(status);
        }
      }
    );
  });
}
