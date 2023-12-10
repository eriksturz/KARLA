export async function sendValuesToPHP(params, url) {
  try {
    // Senden Sie die Daten mit einer POST-Anfrage
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}