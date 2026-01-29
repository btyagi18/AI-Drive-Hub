const { Driver } = require("./models");

exports.createFakeDriver = async (location) => {
    const name = "Driver_" + Math.floor(Math.random() * 900 + 100);
    const fakeLocation = {
        lat: location.lat + (Math.random() / 200),
        lng: location.lng + (Math.random() / 200),
    };

    const driver = await Driver.create({
        name,
        socketId: null, // no real socket
        isOnline: true,
        location: fakeLocation,
        speed: 10
    });

    return driver;
};
