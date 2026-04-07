const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateItinerary = async (destination, days, preferences) => {
  try {
    const prompt = `
Create a detailed travel itinerary.

Destination: ${destination}
Number of days: ${days}
Preferences: ${preferences}

Give a day-by-day plan.
Each day should include:
- Morning activity
- Afternoon activity
- Evening activity
- Food recommendation
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Itinerary Error:", error.message);
    throw error;
  }
};

const generatePacking = async (destination, days, preferences) => {
  try {
    const prompt = `
Create a packing list and travel tips.

Destination: ${destination}
Number of days: ${days}
Preferences: ${preferences}

Include:
1. Essential packing items
2. Clothing suggestions
3. Travel tips
4. Safety advice
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Packing Error:", error.message);
    throw error;
  }
};

module.exports = {
  generateItinerary,
  generatePacking,
};