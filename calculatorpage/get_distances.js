import { sendValuesToPHP } from "./send_to_php.js";

export function getPlaneDistance(
  selectedVehicle,
  Startaddress,
  Goaladdress,
) {
  return new Promise(async (resolve, reject) => {
    try {
      var R = 6371; // Radius der Erde in Kilometern
      var dLat = deg2rad(Goaladdress.lat - Startaddress.lat); 
      var dLon = deg2rad(Goaladdress.lng - Startaddress.lng); 
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(Startaddress.lat)) *
          Math.cos(deg2rad(Goaladdress.lat)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var airDistanceInKilometers = R * c; // Entfernung in Kilometern

    
      await sendValuesToPHP({
        Startadresse: Startaddress.formatted_address,
        Zieladresse: Goaladdress.formatted_address,
        Fahrzeug: selectedVehicle,
        Gesammtdistanz: airDistanceInKilometers,
      }, 'process_and_store_data.php');
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
  ) {
    return new Promise((resolve, reject) => {
      serviceMatrix.getDistanceMatrix(
        {
          origins: [Startaddress.lat + "," + Startaddress.lng],
          destinations: [Goaladdress.lat + "," + Goaladdress.lng],
          travelMode: google.maps.TravelMode[selectedVehicle],
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        async function callback(response, status) {
          if (status === "OK") {
            var distanceText = response.rows[0].elements[0].distance.text;
            var distance = parseFloat(
              distanceText.replace(",", ".").replace(" km", "")
            );
            await sendValuesToPHP({
              Startadresse: Startaddress.formatted_address,
              Zieladresse: Goaladdress.formatted_address,
              Fahrzeug: selectedVehicle,
              Gesammtdistanz: distance,
            }, 'process_and_store_data.php');  
            resolve();
          } else {
            alert(
              "Entfernungsmatrix konnte nicht abgerufen werden. Fehlercode: " +
                status
            );
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
  ) {
    var totalTransitDistance = 0;
  
    return new Promise((resolve, reject) => {
      directionsService.route(
        {
          origin: Startaddress.lat + "," + Startaddress.lng,
          destination: Goaladdress.lat + "," + Goaladdress.lng,
          travelMode: google.maps.TravelMode[selectedVehicle],
        },
        async function (response, status) {
          if (status === "OK") {
            var steps = response.routes[0].legs[0].steps;
  
            for (var i = 0; i < steps.length; i++) {
              var step = steps[i];
  
              if (step.travel_mode == "TRANSIT") {
                totalTransitDistance += parseFloat(step.distance.value) / 1000;
              }
            }
            if (totalTransitDistance <= 100) {
              selectedVehicle = "LOCALTRAIN";
            } else {
              selectedVehicle = "LONGDISTANCETRAIN";
            }
            await sendValuesToPHP({
              Startadresse: Startaddress.formatted_address,
              Zieladresse: Goaladdress.formatted_address,
              Fahrzeug: selectedVehicle,
              Gesammtdistanz: totalTransitDistance,
            }, 'process_and_store_data.php');
            resolve();
          } else {
            alert(
              "Routeninformationen konnten nicht abgerufen werden. Fehlercode: " +
                status
            );
            reject(status);
          }
        }
      );
    });
  }
  
  