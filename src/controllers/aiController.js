const Trip = require("../models/Trip");
const { generateItinerary, generatePacking } = require("../services/geminiService");

const getItinerary = async (req, res) => {
  try {
    const { tripId, destination, days, preferences } = req.body;

    if (!destination || !days || !preferences) {
      return res.status(400).json({
        success: false,
        message: "destination, days, and preferences are required"
      });
    }

    const data = await generateItinerary(destination, days, preferences);

    if (tripId) {
      await Trip.findByIdAndUpdate(
        tripId,
        {
          itinerary: data,
          status: "generated"
        },
        {
          new: true,
          runValidators: true
        }
      );
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating itinerary",
      error: error.message
    });
  }
};

const getPacking = async (req, res) => {
  try {
    const { tripId, destination, days, preferences } = req.body;

    if (!destination || !days || !preferences) {
      return res.status(400).json({
        success: false,
        message: "destination, days, and preferences are required"
      });
    }

    const data = await generatePacking(destination, days, preferences);

    if (tripId) {
      await Trip.findByIdAndUpdate(
        tripId,
        {
          packingList: data,
          localTips: data,
          status: "generated"
        },
        {
          new: true,
          runValidators: true
        }
      );
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating packing list",
      error: error.message
    });
  }
};

module.exports = {
  getItinerary,
  getPacking
};