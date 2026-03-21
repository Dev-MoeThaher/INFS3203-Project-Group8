const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        destination: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        },
        preferences: {
            type: String,
            default: ""
        },
        itinerary: {
            type: String,
            default: ""
        },
        packingList: {
            type: String,
            default: ""
        },
        localTips: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);