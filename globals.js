// globals.js
export var Start = document.getElementById("Start");
export var Goal = document.getElementById("Goal");
export var vehicle = document.getElementById("vehicle");
export var persons = document.getElementById("persons");
export var returnTrip = document.getElementById("returnTrip");
export var autocompleteStart = new google.maps.places.Autocomplete(Start);
export var autocompleteGoal = new google.maps.places.Autocomplete(Goal);
export var serviceMatrix = new google.maps.DistanceMatrixService();
export var directionsService = new google.maps.DistanceMatrixService();
export let Startaddress = {};
export let Goaladdress = {};
export var button1 = document.getElementById("calculateRouteButton");
export var button3 = document.getElementById("addStepButton");
export var time = document.getElementById("time");
export var addStepButton = document.getElementById("addStep");
export var employeeID = document.getElementById("employeeID");