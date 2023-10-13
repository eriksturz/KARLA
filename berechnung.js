function berechneCO2() {
    var zahl = document.getElementById("zahl").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "berechnung.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var ergebnisDiv = document.getElementById("ergebnis");
            ergebnisDiv.innerHTML = "Der CO²-Output ist: " + xhr.responseText + "kg";
        }
    };

    xhr.send("zahl=" + zahl);
}
