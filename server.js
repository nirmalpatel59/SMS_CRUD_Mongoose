let express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    mongoose = require("mongoose"),
    dbVal = require('./utilities/connection');
let ensureAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.send("error message");
        // res.render('index', { errmsg: "Unauthorised to use ping" });
    }
}

require("./src/config/passport")(app);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: "mysecret",
    store: new MongoStore({ url: 'mongodb://nirmal:nirmal@localhost:27017/SMS?authSource=admin' })
}));

// app.use("/students/",require("./controllers/student.controller"));
app.use("/auth/", require("./controllers/auth.controller"));
// app.use("/home", ensureAuthentication, function (req, res) {
//     console.log(res.send("home page rendered"));
// });
app.use("/login", function (req, res) {
    console.log(req);
    res.send({ "username": req.session.passport.user });
});
app.listen(3000, function (req, res) {
    console.log("server is running on port :: " + 3000);
});