<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KARLA</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="stylesheet.css">
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=<?php require 'api_key.php';
    echo $api_key; ?>&libraries=places,routes&callback=initMap">
    </script>
</head>

<body>
    <div id="body">
        <div class="container" id="search">
            <input type="text" name="Start" id="Start" placeholder="Start">
            <input type="text" name="Goal" id="Goal" placeholder="Goal">
            <label for="vehicle">How would you like to travel?</label>
            <select name="vehicle" id="vehicle">
                <option value="DRIVING">Car</option>
                <option value="TRANSIT">Public transport</option>
                <option value="BICYCLING">E-Bike</option>
                <option value="WALKING">On Foot</option>
            </select>
            <button id="calculateRouteButton">Route Berechnen</button>
        </div>
        <div id="routeing">
            <div class="container" id="map" style="width: 400px; height: 400px;"></div>
            <div class="container" id="directionsPanel" style="width: 400px; height: 400px;"></div>
        </div>

    </div>
    <script src="map.js"></script>
    <script src="route.js"></script>
</body>

</html>