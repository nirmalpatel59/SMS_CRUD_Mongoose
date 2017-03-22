let mongoose = require("mongoose"),
    dbUri = "mongodb://nirmal:nirmal@localhost:27017/SMS?authSource=admin",
    winston = require("winston"),
    logger = require("../utilities/logger.js");

mongoose.connect(dbUri);
mongoose.connection.on('connected', function () {
    logger.info('Default Connection to DB established!!!');
});
mongoose.connection.on('error', function() {
    logger.error("Error while connecting to DB.");
});
mongoose.connection.on('disconnected', function () {
    logger.error("Disconnected from DB.");
});
process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        logger.error("Default connection to DB ternimated by application.");
        process.exit(0);
    });
});

module.exports = mongoose.connection;