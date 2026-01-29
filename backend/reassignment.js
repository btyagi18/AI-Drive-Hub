exports.checkReassignment = (driver) => {
    if (driver.speed < 2) return true;
    return false;
};
