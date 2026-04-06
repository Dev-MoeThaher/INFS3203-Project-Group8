const Trip = require("../models/Trip");

const createTrip = async (req, res) => {
    try {
        const { destination, startDate, endDate, preferences } = req.body;

        const trip = new Trip({
            destination,
            startDate,
            endDate,
            preferences
        });

        const savedTrip = await trip.save();

        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            data: savedTrip
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create trip",
            error: error.message
        });
    }
};

const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: trips.length,
            data: trips
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch trips",
            error: error.message
        });
    }
};

const getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        res.status(200).json({
            success: true,
            data: trip
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch trip",
            error: error.message
        });
    }
};

const updateTrip = async (req, res) => {
    try {
        const updatedTrip = await Trip.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTrip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Trip updated successfully",
            data: updatedTrip
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update trip",
            error: error.message
        });
    }
};

const deleteTrip = async (req, res) => {
    try {
        const deletedTrip = await Trip.findByIdAndDelete(req.params.id);

        if (!deletedTrip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Trip deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete trip",
            error: error.message
        });
    }
};

module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
    deleteTrip
};