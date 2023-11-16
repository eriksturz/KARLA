function initMap() {
     map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.006361795258535, lng: 8.399575017774527 },
        zoom: 7
    });

    initializeAutocomplete();
}

function initializeAutocomplete() {
    var startInput = document.getElementById('Start');
    var goalInput = document.getElementById('Goal');
  
    var autocompleteStart = new google.maps.places.Autocomplete(startInput);
    var autocompleteGoal = new google.maps.places.Autocomplete(goalInput);
  }