export function areInputsValid(selectedVehicle, Startaddress, Goaladdress) {
  if (
    selectedVehicle &&
    (Startaddress.formatted_address ||
      (Startaddress.lat && Startaddress.lng)) &&
    (Goaladdress.formatted_address || (Goaladdress.lat && Goaladdress.lng))
  ) {
    return true;
  } else {
    return false;
  }
}