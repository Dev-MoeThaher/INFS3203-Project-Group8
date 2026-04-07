const express = require("express");
const { getItinerary, getPacking } = require("../controllers/aiController");

const router = express.Router();

router.post("/itinerary", getItinerary);
router.post("/packing", getPacking);

module.exports = router;