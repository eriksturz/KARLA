<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["zahl"])) {
    $eingabeZahl = $_POST["zahl"];
    $ergebnis = $eingabeZahl * 2;
    // Hier kannst du die Zahl in PHP verarbeiten und eine Antwort senden
    echo $ergebnis;
} else {
    echo "Fehler: Keine Zahl erhalten.";
}
?>
