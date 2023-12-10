import { sendValuesToPHP } from "./calculatorpage/send_to_php.js";

var button2 = document.getElementById("CreatetripanduserButton");

button2.addEventListener("click", async function () {
  var lastname = document.getElementById("lastname").value;
  var employeeID = document.getElementById("employeeID").value;
  await sendValuesToPHP(
    { lastname: lastname, employeeID: employeeID },
    "set_trip_and_user.php"
  );
  console.log(lastname, employeeID);
  window.location.href = "http://localhost/KARLA/calculatorpage/calculator.html";
});
