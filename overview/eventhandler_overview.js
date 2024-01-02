import { getTripData, getSectionData } from "./get_data_from_database.js";

document.addEventListener("DOMContentLoaded", () => {
  getTripData("get_data_from_trip.php", {
    distance: "distance_value",
    co2_emission: "co2_emission_value",
    startaddress: "startaddress_value",
    goaladdress: "goaladdress_value",
  }, "overallview");

  getSectionData("get_data_from_section.php", "destinations");
});
