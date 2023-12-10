import { sendValuesToPHP } from "./send_to_php.js";

export function calculateAirDistance(
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
      }, 'send_data_to_database.php');
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
