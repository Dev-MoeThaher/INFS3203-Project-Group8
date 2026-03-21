const tripForm = document.getElementById("tripForm");
const result = document.getElementById("result");

tripForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const destination = document.getElementById("destination").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const preferences = document.getElementById("preferences").value;

    result.innerHTML = `
    <h2>Trip Request Captured</h2>
    <p><strong>Destination:</strong> ${destination}</p>
    <p><strong>Dates:</strong> ${startDate} to ${endDate}</p>
    <p><strong>Preferences:</strong> ${preferences || "None"}</p>
    <p>The AI feature will be connected in the next step.</p>
  `;
});