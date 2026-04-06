const mongoose = require("mongoose");

// Trip model for storing trip details and AI-generated outputs
const tripSchema = new mongoose.Schema(
    {
        destination: {
            type: String,
            required: [true, "Destination is required"],
            trim: true
        },
        startDate: {
            type: String,
            required: [true, "Start date is required"]
        },
        endDate: {
            type: String,
            required: [true, "End date is required"]
        },
        preferences: {
            type: String,
            default: "",
            trim: true
        },
        itinerary: {
            type: String,
            default: "",
            trim: true
        },
        packingList: {
            type: String,
            default: "",
            trim: true
        },
        localTips: {
            type: String,
            default: "",
            trim: true
        },
        status: {
            type: String,
            enum: ["draft", "generated"],
            default: "draft"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);