import { sendValuesToPHP } from "./send_to_php.js";

export function getPlaneDistance(
  selectedVehicle,
  Startaddress,
  Goaladdress,
  travelers,
  returnT
) {
  console.log(Startaddress)
  console.log(Goaladdress)
  return new Promise(async (resolve, reject) => {
    try {
      var R = 6371; // Radius der Erde in Kilometern
      var dLat = deg2rad(Goaladdress.lat - Startaddress.lat); console.log(dLat);
      var dLon = deg2rad(Goaladdress.lng - Startaddress.lng); console.log(dLon);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(Startaddress.lat)) *
          Math.cos(deg2rad(Goaladdress.lat)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var airDistanceInKilometers = R * c; // Entfernung in Kilometern
      console.log(
        "Luftlinienentfernung: " + airDistanceInKilometers.toFixed(2) + " km"
      );
      if (returnT) {
        airDistanceInKilometers = airDistanceInKilometers * 2;
      } //Wenn Rückfahrt, dann Entfernung verdoppeln
      console.log(Startaddress.formatted_address, Goaladdress.formatted_address, travelers, selectedVehicle, airDistanceInKilometers);
      await sendValuesToPHP({
        Startadresse: Startaddress.formatted_address,
        Zieladresse: Goaladdress.formatted_address,
        Mitfahrer: travelers,
        Fahrzeug: selectedVehicle,
        Gesammtdistanz: airDistanceInKilometers,
      }, 'process_and_store_data.php');
      console.log(
        Startaddress,
        Goaladdress,
        travelers,
        selectedVehicle,
        airDistanceInKilometers.toFixed(2) + " km"
      );
      resolve(airDistanceInKilometers);
    } catch (error) {
      reject(error);
    }
  });
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}




export function getStreetDistance(
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
            }, 'process_and_store_data.php');
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

  
  export function getRailDistance(
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
                totalTransitDistance += parseFloat(step.distance.value) / 1000;
  
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
              Gesammtdistanz: totalTransitDistance,
            }, 'process_and_store_data.php');
  
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
  
  