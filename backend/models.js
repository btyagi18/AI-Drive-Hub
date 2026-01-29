const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
    name: String,
    socketId: String,
    isOnline: Boolean,
    location: { lat: Number, lng: Number },
    speed: { type: Number, default: 0 },
});

const RideSchema = new mongoose.Schema({
    riderSocket: String,
    riderLocation: Object,
    driverId: String,
    status: String,
    reassignedOnce: { type: Boolean, default: false }   // ADD THIS
});


module.exports = {
    Driver: mongoose.model("Driver", DriverSchema),
    Ride: mongoose.model("Ride", RideSchema)
};
