export function areInputsValid(selectedVehicle, Startaddress, Goaladdress, returnT, travelers) {
  // Check if the fields are filled out
  if (
    selectedVehicle &&
    (Startaddress.formatted_address ||
      (Startaddress.lat && Startaddress.lng)) &&
    (Goaladdress.formatted_address || (Goaladdress.lat && Goaladdress.lng)) &&
    (returnT === true || returnT === false) &&
    travelers
  ) {
    return true;
  } else {
    return false;
  }
}