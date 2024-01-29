import {
  Startaddress,
  Goaladdress,
  vehicle,
  autocompleteGoal,
  autocompleteStart,
  serviceMatrix,
  directionsService,
  button1,
} from "../globals.js";
import { getStreetDistance, getRailDistance, getPlaneDistance } from "./get_distances.js";
import { areInputsValid } from "./validate_input.js";
import { showsteps } from "./show_steps.js";
import { showstepsOnLoad } from "./show_steps.js";

vehicle.addEventListener("change", function () {
  var selectedVehicle = vehicle.value;
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

document.addEventListener("DOMContentLoaded", () => {
  showstepsOnLoad();
});


document
  .getElementById("myform")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    var selectedVehicle = vehicle.value; 
    if (
      areInputsValid(
        selectedVehicle,
        Startaddress,
        Goaladdress,
      )
    ) {
      switch (selectedVehicle) {
        case "DRIVING":
        case "BICYCLING":
          await getStreetDistance(
            serviceMatrix,
            Startaddress,
            Goaladdress,
            selectedVehicle,
          );
          break;

        case "PLANEIN":
        case "PLANEOUT":
          await getPlaneDistance(
            selectedVehicle,
            Startaddress,
            Goaladdress,
          );
          break;
      
        case "TRANSIT":
          await getRailDistance(
            directionsService,
            Startaddress,
            Goaladdress,
            selectedVehicle,
          );
          break;
      }
      event.target.submit();
      showsteps(Startaddress, Goaladdress);
    } else {
      alert("Bitte nutzen Sie die Adressvorschläge.");
    }
  });

button1.addEventListener("click", async function (event) {
  var userConfirmed = confirm("Sind alle Reiseabschnitte hinzugefügt?");
  if (userConfirmed) {
    window.location.href = "http://localhost/KARLA/overview/overview.html";
  } else {
    event.preventDefault();
  }
});
