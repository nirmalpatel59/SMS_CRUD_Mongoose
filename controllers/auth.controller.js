let express = require('express'),
    router = express.Router(),
    passport = require("passport"),
    userModal = require("../model/user.model"),
    jwt = require('jsonwebtoken'),
    logger = require("../utilities/logger.js"),
    app = express();
router.get("/signUp", function (req, res) {
    res.send("Registration form displayed");
});
router.post("/signUp", registerUser);

router.post('/signIn', signInUser);
module.exports = router;

function signInUser(req,res) {
    var userinfo = {
        "username":req.body.username,
        "password":req.body.password
    }
    userModal.findOne({"username":userinfo.username}, function (err, data) {
        console.log(data);
        if (err) {
            res.send(err);
        } else {
            if (data) {
                if (data.username === userinfo.username || data.password === userinfo.password) {
                    var token = jwt.sign({ sub: data.username }, 'mysecret');
                    var loggedInUser = {
                        "username": data.username,
                        "first_name": data.first_name,
                        "last_name": data.last_name,
                        "email": data.email,
                        "role": data.role,
                        "gender": data.gender,
                        "marital_status": data.marital_status,
                        "type": data.type,
                        "status": data.status,
                        "token": token
                    };
                    res.send(loggedInUser);
                }else {
                    res.send("Invalid Credentials");
                }
                // res.json(data).end();
            } else {
                res.send("No user found with given details");
            }
        }
    });
}

function registerUser(req, res) {
    let userInstance = new userModal({
        username: req.body.phone_no,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        middle_name: req.body.middle_name || "",
        marital_status: req.body.marital_status || "",
        gender: req.body.gender,
        email: req.body.email || "",
        phone_no: req.body.phone_no,
        date_of_joining: req.body.date_of_joining || "",
        date_of_birth: req.body.date_of_birth || "",
        role: req.body.role || "",
        type: req.body.type || "",
        academics: req.body.academics || "",
        specialization: req.body.specialization || "",
        major_specialization: req.body.major_specialization || "",
        standard_association: req.body.standard_association || "",
        current_standard_association: req.body.current_standard_association || "",
        password: req.body.password
    });
    // res.send(req.body);
    userInstance.save(function (err, data) {
        if (err) {
            console.log("in if");
            logger.error(err);
            res.send(err);
        } else {
            console.log("in else");
            logger.info("User registered successfully");
            res.send(data);
        }
    });
}