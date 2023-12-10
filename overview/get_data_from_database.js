export function getDatafromDB() {
  // Senden Sie die Daten mit einer POST-Anfrage
  fetch("get_data_from_database.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  })
    .then((response) => response.json())
    .then((data) => {
      // Verwenden Sie die zurückgegebenen Daten, um die HTML-Seite zu aktualisieren
      document.getElementById("distance_value").textContent = data.distance;
      document.getElementById("co2_emissions_value").textContent =
        data.co2_emissions;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


