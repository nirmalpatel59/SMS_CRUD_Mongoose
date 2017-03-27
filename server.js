let express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),
    expressJWT = require("express-jwt"),
    jwt = require("jsonwebtoken"),
    MongoStore = require('connect-mongo')(session),
    mongoose = require("mongoose"),
    dbVal = require('./utilities/connection');
let ensureAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } 
    res.redirect("/");
}

// require("./src/config/passport")(app);
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(session({
//     secret: "mysecret",
//     store: new MongoStore({ url: 'mongodb://nirmal:nirmal@localhost:27017/SMS?authSource=admin' })
// }));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: 'mongodb://nirmal:nirmal@localhost:27017/SMS?authSource=admin' })
}));

app.use('/', expressJWT({ secret: "mysecret", credentialsRequired: true }).unless(
    {
        path: [
            '/user/signUp',
            '/user/signIn'
        ]
    }));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.send("No Authorization token is provided. Redirect to Login page");
    }
});

// app.use("/students/",require("./controllers/student.controller"));
app.use("/user/", require("./controllers/auth.controller"));
app.use("/home", function (req, res) {
    console.log(res.send("home page rendered"));
});

app.use("/account", require("./controllers/account.controller"));
app.use("/exams", require("./controllers/exam.controller"));

app.use("/login", function (req, res) {
    res.send({ "username": req.session.passport.user });
});
app.listen(3000, function (req, res) {
    console.log("server is running on port :: " + 3000);
});