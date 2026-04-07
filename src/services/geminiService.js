const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateItinerary = async (destination, days, preferences) => {
  try {
    const prompt = `
You are writing for a modern travel planning web app.

Create a SHORT travel itinerary for ${destination} for ${days} day(s).

Traveler preferences: ${preferences}

IMPORTANT RULES:
- Keep it concise.
- Maximum 3 days only.
- If days is more than 3, summarize and only show the first 3 days.
- Each day must have exactly these 4 lines:
Day 1:
Morning: ...
Afternoon: ...
Evening: ...
Food: ...

- Use short phrases, not long paragraphs.
- No introductions.
- No conclusions.
- No extra travel tips.
- No markdown symbols like ** or ---.
- No more than 20 words per line.
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
You are writing for a modern travel planning web app.

Create a SHORT packing list and travel tips for ${destination} for ${days} day(s).

Traveler preferences: ${preferences}

IMPORTANT RULES:
- Keep it concise.
- Use exactly this format:

Essentials:
- ...
- ...
- ...

Clothing:
- ...
- ...
- ...

Tips:
- ...
- ...
- ...

- Maximum 3 bullet points under each section.
- Each bullet must be short.
- No introduction.
- No conclusion.
- No markdown bold.
- No long explanations.
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
  generatePacking
};