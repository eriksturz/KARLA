export function getTripData(url, elementIds, parentElementId) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  })
    .then((response) => response.json())
    .then((data) => {
      const parentElement = document.getElementById(parentElementId);
      parentElement.innerHTML = `
    <h2>Gesammtübersicht</h2>
      <table>
        <tr>
         <th>Von</th>
         <th>Nach</th>
         <th>Entfernung</th>
         <th>CO²-Emissionen</th>   
          </tr>
            <tr>
              <td><span id="${elementIds.startaddress}">${data.startaddress}</span></td>
              <td><span id="${elementIds.goaladdress}">${data.goaladdress}</span></td>
              <td><span id="${elementIds.distance}">${data.distance}</span> km</td>       
              <td><span id="${elementIds.co2_emissions}">${data.co2_emissions}</span> kg</td>     
            </tr>
      </table>
  `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function getSectionData(url, parentElementId) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  })
    .then((response) => response.json())
    .then((data) => {
      const parentElement = document.getElementById(parentElementId);
      parentElement.innerHTML = `
      <h2>Teilstrecken</h2>
        <table>
          <tr>
            <th>Von</th>
            <th>Nach</th>
            <th>Verkehrsmittel</th>
            <th>Entfernung</th>
            <th>CO²-Ausstoß</th>
          </tr>
          ${data
            .map(
              (item) => `
            <tr>
              <td>${item.sectionstart}</td>
              <td>${item.sectiongoal}</td>
              <td>${item.vehicleName}</td>
              <td>${item.sectiondistance} km</td>
              <td>${item.sectionemissions} kg</td>
            </tr>
          `
            )
            .join("")}
        </table>
      `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
