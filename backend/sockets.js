const { Driver, Ride } = require("./models");
const { findNearestDriver } = require("./matching");
const { checkReassignment } = require("./reassignment");
const { createFakeDriver } = require("./fakeDriver");

let io;

exports.initSockets = (server) => {
    io = require("socket.io")(server, {
        cors: { origin: "*" }
    });

    console.log("Socket server started");

    io.on("connection", (socket) => {
        console.log("Connected:", socket.id);

        // ---------------------------
        // DRIVER GOES ONLINE
        // ---------------------------
        socket.on("driver-online", async (data) => {
            await Driver.findOneAndUpdate(
                { name: data.name },
                {
                    socketId: socket.id,
                    isOnline: true,
                    location: data.location,
                    speed: 10
                },
                { upsert: true }
            );

            console.log("Driver online:", data.name);
        });

        // ---------------------------
        // DRIVER LOCATION UPDATES
        // ---------------------------
        socket.on("driver-location", async (data) => {
            await Driver.findOneAndUpdate(
                { socketId: socket.id },
                { location: data.coords, speed: data.speed }
            );

            // send the driver's movement
            io.emit("driver-update", data);

            const driver = await Driver.findOne({ socketId: socket.id });
            const ride = await Ride.findOne({ driverId: socket.id });

            if (!ride) return; // driver not assigned

            const needReassign = checkReassignment(driver);

            // 🔥 Only 1 reassignment allowed
            if (needReassign && !ride.reassignedOnce) {
                console.log("Driver stuck! Reassigning...");

                ride.reassignedOnce = true;
                await ride.save();

                // Tell rider that the driver is stuck
                io.to(ride.riderSocket).emit("driver-stuck");

                // Try to find real driver
                let newDriver = await findNearestDriver(ride.riderLocation);

                // ❗ if no real driver → CREATE FAKE AI DRIVER
                if (!newDriver || newDriver.socketId === socket.id) {
                    console.log("No real driver available → creating AI driver...");
                    newDriver = await createFakeDriver(ride.riderLocation);
                }

                console.log("New driver assigned:", newDriver.name);

                // Update ride with new driver
                ride.driverId = newDriver.socketId || newDriver._id.toString();
                await ride.save();

                // Notify rider
                setTimeout(() => {
                    io.to(ride.riderSocket).emit("new-driver-assigned", {
                        name: newDriver.name,
                        coords: newDriver.location
                    });
                }, 700);
            }
        });

        // ---------------------------
        // RIDER REQUESTS RIDE
        // ---------------------------
        socket.on("request-ride", async (data) => {
            let nearest = await findNearestDriver(data.location);

            // If no real driver, create an AI fallback driver
            if (!nearest) {
                console.log("No driver found → creating fallback AI driver");
                nearest = await createFakeDriver(data.location);
            }

            console.log("Driver assigned:", nearest.name);

            await Ride.create({
                riderSocket: socket.id,
                riderLocation: data.location,
                driverId: nearest.socketId || nearest._id.toString(),
                status: "assigned",
                reassignedOnce: false
            });

            // Only notify real driver (AI driver has no socket)
            if (nearest.socketId) {
                io.to(nearest.socketId).emit("ride-offer", {
                    riderSocket: socket.id,
                    location: data.location
                });
            }

            // For AI driver → instantly accept ride
            if (!nearest.socketId) {
                setTimeout(() => {
                    io.to(socket.id).emit("ride-started", nearest.name);
                }, 800);
            }
        });

        // ---------------------------
        // DRIVER ACCEPTS RIDE
        // ---------------------------
        socket.on("ride-accepted", (riderSocket) => {
            io.to(riderSocket).emit("ride-started", "Driver Assigned");
        });
    });

    // ---------------------------
    // AI DRIVER MOVEMENT SIMULATION
    // ---------------------------
    setInterval(async () => {
        const aiDrivers = await Driver.find({ socketId: null, isOnline: true });

        aiDrivers.forEach(async (d) => {
            const newLocation = {
                lat: d.location.lat + (Math.random() / 350),
                lng: d.location.lng + (Math.random() / 350),
            };

            await Driver.updateOne({ _id: d._id }, { location: newLocation });

            io.emit("driver-update", {
                coords: newLocation,
                speed: 14,
            });
        });
    }, 2000);
};
