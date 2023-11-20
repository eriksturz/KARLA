var xhr = new XMLHttpRequest();

export function sendValuesToPHP(...params) {
  xhr.open("POST", "route_by_car.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Erstelle den Daten-String basierend auf den übergebenen Parametern
  var postData = params
    .map((param) => param.name + "=" + encodeURIComponent(param.value))
    .join("&");

  // Callback-Funktion für den Abschluss der Anfrage
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Antwort vom Server
      console.log(xhr.responseText);
    }
  };

  // Daten senden
  xhr.send(postData);
}


// anderes_modul.js

import { sendValuesToPHP } from "./send_values_to_php.js";

// Beispielverwendung
sendValuesToPHP(
  { name: "Startadresse", value: "Wert1" },
  { name: "Zieladresse", value: "Wert2" },
  { name: "Gesammtdistanz", value: 100 },
  { name: "Mitfahrer", value: 3 }
);
