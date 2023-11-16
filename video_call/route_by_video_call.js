var Time = document.getElementById("Time");
var xhr = new XMLHttpRequest();
var callTime = parseFloat(Time.value);

function sendValuesToPHP(callTime) {
  xhr.open("POST", "route_by_video_call.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  var postData = "Calldauer" + callTime;

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(postData);
}

document
  .getElementById("calculateRouteButton")
  .addEventListener("click", function () {
    if (callTime >= 0) {
      sendValuesToPHP(callTime.value);
    } else {
      alert("Bitte geben Sie die ungegfähre Länge der Konferenz an.");
    }
  });
