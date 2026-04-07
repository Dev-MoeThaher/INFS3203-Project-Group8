const tripForm = document.getElementById("tripForm");
const statusMessage = document.getElementById("statusMessage");
const savedTripResult = document.getElementById("savedTripResult");
const itineraryResult = document.getElementById("itineraryResult");
const packingResult = document.getElementById("packingResult");
const submitButton = tripForm.querySelector("button");

const setStatus = (message, className = "") => {
  statusMessage.className = "status-message";
  if (className) {
    statusMessage.classList.add(className);
  }
  statusMessage.textContent = message;
};

const setLoadingCard = (element, message) => {
  element.className = "result-content loading-state";
  element.innerHTML = `
    <div class="loading-row">
      <span class="spinner" aria-hidden="true"></span>
      <span class="loading-message">${message}</span>
    </div>
  `;
};

const setErrorCard = (element, message) => {
  element.className = "result-content error-state";
  // wrap the message in a <pre> to preserve formatting if any
  element.innerHTML = `<pre class="result-text">${message}</pre>`;
};

const setNormalCard = (element, message) => {
  element.className = "result-content";
  // render message safely inside a pre element to preserve line breaks
  const pre = document.createElement("pre");
  pre.className = "result-text";
  pre.textContent = message;
  element.innerHTML = "";
  element.appendChild(pre);
};

const calculateTripDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end.getTime() - start.getTime();
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;

  if (days < 1 || Number.isNaN(days)) {
    return 0;
  }

  return days;
};

tripForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const destination = document.getElementById("destination").value.trim();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const preferences = document.getElementById("preferences").value.trim();
  const days = calculateTripDays(startDate, endDate);

  if (!destination || !startDate || !endDate) {
    setStatus("Please complete destination, start date, and end date.", "error-state");
    return;
  }

  if (days < 1) {
    setStatus("End date must be the same as or after the start date.", "error-state");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Generating Plan...";

  setStatus("Saving trip and generating AI results...");
  setLoadingCard(savedTripResult, "Saving trip details...");
  setLoadingCard(itineraryResult, "Generating itinerary...");
  setLoadingCard(packingResult, "Generating packing list and travel tips...");

  try {
    const tripResponse = await fetch("/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        destination,
        startDate,
        endDate,
        preferences
      })
    });

    const tripData = await tripResponse.json();

    if (!tripResponse.ok) {
      throw new Error(tripData.message || "Failed to save trip");
    }

    savedTripResult.className = "result-content saved-trip-list";
    savedTripResult.innerHTML = `
            <p><strong>Destination:</strong> ${tripData.data.destination}</p>
            <p><strong>Dates:</strong> ${tripData.data.startDate} to ${tripData.data.endDate}</p>
            <p><strong>Preferences:</strong> ${tripData.data.preferences || "None"}</p>
            <p><strong>Status:</strong> ${tripData.data.status}</p>
        `;

    const itineraryResponse = await fetch("/api/ai/itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        destination,
        days,
        preferences: preferences || "general travel"
      })
    });

    const itineraryData = await itineraryResponse.json();

    if (!itineraryResponse.ok) {
      throw new Error(itineraryData.message || "Failed to generate itinerary");
    }

    setNormalCard(itineraryResult, itineraryData.data);

    const packingResponse = await fetch("/api/ai/packing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        destination,
        days,
        preferences: preferences || "general travel"
      })
    });

    const packingData = await packingResponse.json();

    if (!packingResponse.ok) {
      throw new Error(packingData.message || "Failed to generate packing list");
    }

    setNormalCard(packingResult, packingData.data);

    setStatus("Trip saved and AI travel plan generated successfully.");
  } catch (error) {
    setStatus(error.message || "Something went wrong while generating the trip plan.", "error-state");

    if (itineraryResult.className.includes("loading-state")) {
      setErrorCard(itineraryResult, "Unable to generate itinerary.");
    }

    if (packingResult.className.includes("loading-state")) {
      setErrorCard(packingResult, "Unable to generate packing list and tips.");
    }

    if (savedTripResult.className.includes("loading-state")) {
      setErrorCard(savedTripResult, "Unable to save trip details.");
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Generate Travel Plan";
  }
});