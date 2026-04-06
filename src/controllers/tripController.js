const Trip = require("../models/Trip");
const AppError = require("../utils/AppError");

const createTrip = async (req, res, next) => {
    try {
        const { destination, startDate, endDate, preferences } = req.body;

        if (!destination || !startDate || !endDate) {
            return next(new AppError("Destination, start date, and end date are required", 400));
        }

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
        next(error);
    }
};

const getAllTrips = async (req, res, next) => {
    try {
        const trips = await Trip.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: trips.length,
            data: trips
        });
    } catch (error) {
        next(error);
    }
};

const getTripById = async (req, res, next) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return next(new AppError("Trip not found", 404));
        }

        res.status(200).json({
            success: true,
            data: trip
        });
    } catch (error) {
        next(error);
    }
};

const updateTrip = async (req, res, next) => {
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
            return next(new AppError("Trip not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Trip updated successfully",
            data: updatedTrip
        });
    } catch (error) {
        next(error);
    }
};

const deleteTrip = async (req, res, next) => {
    try {
        const deletedTrip = await Trip.findByIdAndDelete(req.params.id);

        if (!deletedTrip) {
            return next(new AppError("Trip not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Trip deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
    deleteTrip
};