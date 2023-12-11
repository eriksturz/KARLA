import {
  Startaddress,
  Goaladdress,
  vehicle,
  persons,
  returnTrip,
  autocompleteGoal,
  autocompleteStart,
  serviceMatrix,
  directionsService,
  button1,
  time,
} from "../globals.js";
import { routing_on_street } from "./routing_on_street.js";
import { calculateAirDistance } from "./routing_by_plane.js";
import { areInputsValid } from "./validate_input.js";
import { routing_by_rail } from "./routing_public_transport.js";
import { sendValuesToPHP } from "./send_to_php.js";
import { showsteps } from "./show_steps.js";
import { showstepsOnLoad } from "./show_steps.js";

vehicle.addEventListener("change", function () {
  var selectedVehicle = vehicle.value;
  console.log(selectedVehicle);
  // Setzen Sie die types Option basierend auf dem gewählten Fahrzeug
  switch (selectedVehicle) {
    case "PLANEIN":
    case "PLANEOUT":
      autocompleteStart.setOptions({ types: ["airport"] });
      autocompleteGoal.setOptions({ types: ["airport"] });
      break;
    default:
      autocompleteStart.setOptions({ types: ["geocode"] });
      autocompleteGoal.setOptions({ types: ["geocode"] });
  }
});

autocompleteStart.addListener("place_changed", function () {
  var place = autocompleteStart.getPlace();
  Startaddress.lat = place.geometry.location.lat();
  Startaddress.lng = place.geometry.location.lng();
  let city, postal_code, country;
  for (let i = 0; i < place.address_components.length; i++) {
    let component = place.address_components[i];
    if (component.types.includes("locality")) {
      city = component.long_name;
    } else if (component.types.includes("postal_code")) {
      postal_code = component.long_name;
    } else if (component.types.includes("country")) {
      country = component.long_name;
    }
  }
  
  Startaddress.formatted_address = postal_code ? `${postal_code}, ${city}, ${country}` : `${city}, ${country}`;
});

// Event-Handler für Goaladresse
autocompleteGoal.addListener("place_changed", function () {
  var place = autocompleteGoal.getPlace();
  Goaladdress.lat = place.geometry.location.lat();
  Goaladdress.lng = place.geometry.location.lng();
  let city, postal_code, country;
  for (let i = 0; i < place.address_components.length; i++) {
    let component = place.address_components[i];
    if (component.types.includes("locality")) {
      city = component.long_name;
    } else if (component.types.includes("postal_code")) {
      postal_code = component.long_name;
    } else if (component.types.includes("country")) {
      country = component.long_name;
    }
  }

  Goaladdress.formatted_address = postal_code ? `${postal_code}, ${city}, ${country}` : `${city}, ${country}`;
});

document.addEventListener("DOMContentLoaded", (event) => {
  showstepsOnLoad();
});

// Add event listener to the button
document
  .getElementById("myform")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Button clicked");
    // Get the input fields
    var selectedVehicle = vehicle.value; //Select-Element mit 5 Optionen
    var returnT = returnTrip.checked; //Checkbox-Element
    var travelers = parseFloat(persons.value); //Input-Element
    // Check if the fields are filled out
    if (
      areInputsValid(
        selectedVehicle,
        Startaddress,
        Goaladdress,
        returnT,
        travelers
      )
    ) {
      console.log(Startaddress);
      console.log(Goaladdress);
      switch (selectedVehicle) {
        case "DRIVING":
          await routing_on_street(
            serviceMatrix,
            Startaddress,
            Goaladdress,
            selectedVehicle,
            travelers,
            returnT
          );
          break;
        case "BICYCLING":
          await routing_on_street(
            serviceMatrix,
            Startaddress,
            Goaladdress,
            selectedVehicle,
            travelers,
            returnT
          );
          break;

        case "PLANEIN":
          await calculateAirDistance(
            selectedVehicle,
            Startaddress,
            Goaladdress,
            travelers,
            returnT
          );
          break;
        case "PLANEOUT":
          await calculateAirDistance(
            selectedVehicle,
            Startaddress,
            Goaladdress,
            travelers,
            returnT
          );
          break;

        case "TRANSIT":
          await routing_by_rail(
            directionsService,
            Startaddress,
            Goaladdress,
            selectedVehicle,
            travelers,
            returnT
          );
          break;
      }
      event.target.submit();
      showsteps(Startaddress, Goaladdress);
    } else {
      // Display an error message or perform some other action
      alert("Bitte füllen Sie alle Felder aus.");
    }
  });

button1.addEventListener("click", async function () {
  window.location.href = "http://localhost/KARLA/overview/overview.html";
});
