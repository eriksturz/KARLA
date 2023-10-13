// JavaScript-Funktion zum Hinzufügen von Optionen zum Dropdown
function addOption(value, text) {
    var dropdown = document.getElementById('dropdown');
    var option = document.createElement('option');
    option.value = value;
    option.text = text;
    dropdown.add(option);
}

// AJAX-Anfrage, um Dropdown-Optionen zu laden
var xhr = new XMLHttpRequest();
xhr.open("GET", "vehicle class.php", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var vehicles = JSON.parse(xhr.responseText);
        vehicles.forEach(function (vehicle) {
            addOption(vehicle.CO2OUT, vehicle.vtype);
        });
    }
};
xhr.send();
