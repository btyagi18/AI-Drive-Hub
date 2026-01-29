const { Driver } = require("./models");
const { getDistance } = require("./helpers");

exports.findNearestDriver = async (riderLocation) => {
    const drivers = await Driver.find({ isOnline: true });

    if (!drivers.length) return null;

    let best = null;
    let minDistance = Infinity;

    for (const d of drivers) {
        const dist = getDistance(
            riderLocation.lat,
            riderLocation.lng,
            d.location.lat,
            d.location.lng
        );

        if (dist < minDistance) {
            minDistance = dist;
            best = d;
        }
    }

    return best;
};
