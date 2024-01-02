import { sendValuesToPHP } from "./calculatorpage/send_to_php.js";

document.getElementById("createUserTrip").addEventListener("click", async function () {
  var lastname = document.getElementById("lastname").value;
  var employeeID = document.getElementById("employeeID").value;
  await sendValuesToPHP(
    { lastname: lastname, employeeID: employeeID },
    "send_to_DB.php"
  );
  console.log(lastname, employeeID);
  window.location.href = "http://localhost/KARLA/calculatorpage/calculator.html";
});
