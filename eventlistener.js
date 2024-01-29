import { sendValuesToPHP } from "./calculatorpage/send_to_php.js";

document.getElementById("createUserTrip").addEventListener("click", async function () {
  var lastname = document.getElementById("lastname").value;
  var employeeID = document.getElementById("employeeID").value;
  var travelers = document.getElementById("travelers").value;

  if (!lastname || !employeeID || !travelers) {
    alert("Bitte füllen Sie alle Felder aus.");
    return; 
  }

  await sendValuesToPHP(
    { lastname: lastname, employeeID: employeeID, travelers: travelers },
    "send_to_DB.php"
  );

  window.location.href = "http://localhost/KARLA/calculatorpage/calculator.html";
});
