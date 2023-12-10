export function showstepsOnLoad() {
    var div = document.getElementById("steps");
    var steps = sessionStorage.getItem('steps') || '<p>Noch keine Zwischenschritte hinzugefügt</p>';
    div.innerHTML = '<h2>Ihre Reise</h2>' + steps;
}

export function showsteps(Startaddress, Goaladdress) {
    var div = document.getElementById("steps");
    var stepNumber = parseInt(sessionStorage.getItem('stepNumber') || '0') + 1;
    sessionStorage.setItem('stepNumber', stepNumber.toString());
    var newStep = "<p>Abschnitt " + stepNumber + ": Start: " + Startaddress.formatted_address + ", Ziel: " + Goaladdress.formatted_address + "</p>";
    var existingSteps = sessionStorage.getItem('steps') || '';
    sessionStorage.setItem('steps', existingSteps + newStep);
    div.innerHTML = '<h2>Ihre Reise</h2>' + existingSteps + newStep;
}