function setVisibility(id, isVisible) {
  const element = document.getElementById(id);
  if (isVisible) {
    element.classList.remove("hidden");
    element.classList.add("visible");
  } else {
    element.classList.add("hidden");
    element.classList.remove("visible");
  }
}

window.addEventListener("load", function () {
  // Anfangs sind alle Inputs deaktiviert
  setVisibility("startdiv", false);
  setVisibility("goaldiv", false);
  setVisibility("returnTripdiv", false);
  setVisibility("personsdiv", false);
  setVisibility("timediv", false);
  setVisibility("buttondiv", false);

  document.getElementById("vehicle").onchange = function () {
    let vehicle = this.value;
    console.log(vehicle);
    // Abhängig von der ausgewählten Option werden die Inputs ein- oder ausgeblendet
    switch (vehicle) {
      case "VIDEOCALL":
        setVisibility("startdiv", false);
        setVisibility("goaldiv", false);
        setVisibility("returnTripdiv", false);
        setVisibility("personsdiv", false);
        setVisibility("timediv", true);
        setVisibility("buttondiv", true);
        break;
      case "DRIVING":
        setVisibility("startdiv", true);
        setVisibility("goaldiv", true);
        setVisibility("returnTripdiv", true);
        setVisibility("personsdiv", true);
        setVisibility("timediv", false);
        setVisibility("buttondiv", true);
        break;
      case "placeholder":
        setVisibility("startdiv", false);
        setVisibility("goaldiv", false);
        setVisibility("returnTripdiv", false);
        setVisibility("personsdiv", false);
        setVisibility("timediv", false);
        setVisibility("buttondiv", false);
        break;
      default:
        setVisibility("startdiv", true);
        setVisibility("goaldiv", true);
        setVisibility("returnTripdiv", true);
        setVisibility("personsdiv", false);
        setVisibility("timediv", false);
        setVisibility("buttondiv", true);
    }
  };
});
