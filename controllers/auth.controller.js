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
router.get("/signIn", getSignInPage);
router.post("/signUp", registerUser);
router.post('/signIn', signInUser);
router.get('/myprofile', getUserProfile);
router.put('/myprofile', updateUserProfile);
router.put('/changePassword', changePassword);

module.exports = router;

function getSignInPage(req, res) {
    res.send("login page rendered.")
}

function signInUser(req, res) {
    var userinfo = {
        "username": req.body.username,
        "password": req.body.password
    }
    userModal.findOne({ "username": userinfo.username }, function (err, data) {
        console.log(data);
        if (err) {
            res.send(err);
        } else {
            if (data) {
                if (data.username === userinfo.username && data.password === userinfo.password) {
                    var token = jwt.sign({ username: data.username }, 'mysecret');
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
                } else {
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

function getUserProfile(req, res) {
    if (req.user && req.user.username) {
        userModal.findOne({ "username": req.user.username }, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                if (data)
                    res.send(data);
            }
        });
    }
}

function updateUserProfile(req, res) {
    console.log(req.user);
    let updatedData = {
        "first_name"                   : req.body.first_name,
        "last_name"                    : req.body.last_name,
        "middle_name"                  : req.body.middle_name,
        "marital_status"               : req.body.marital_status,
        "gender"                       : req.body.gender,
        "email"                        : req.body.email,
        "phone_no"                     : req.body.phone_no,
        "date_of_joining"              : req.body.date_of_joining,
        "date_of_birth"                : req.body.date_of_birth,
        "role"                         : req.body.role,
        "type"                         : req.body.type,
        "major_specialization"         : req.body.major_specialization,
        "current_standard_association" : req.body.current_standard_association,
        "standard_association"         : req.body.standard_association,
        "specialization"               : req.body.specialization,
        "academics"                    : req.body.academics,
        "updated_at"                   : Date.now()
    };
    userModal.findOneAndUpdate({ "username": req.user.username }, updatedData, { new: true }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            if (data) {
                res.json(data).end();
            } else {
                res.send("No user found  with given details");
            }
        }
    });
}

function changePassword(req, res) {
    userModal.findOne({"username": req.user.username}, 'password', function (err, data) {
        if(err) {
            res.send(err);
        }else {
            if(data) {
                if (req.body.current_password === data.password) {
                    let updatedata = {
                        password:req.body.new_password
                    };
                    userModal.findOneAndUpdate({"username": req.user.username}, updatedata, {new: true}, function(err, userdata) {
                        if(err) {
                            res.send(err);
                        }else {
                            if(userdata) {
                                res.send("Password changes successfully");
                            }else {
                                res.send("No user founf with given details");
                            }
                        }
                    });
                }else {
                    res.send("Current password in wrong")
                }
            }else {
                res.send("No User found with given details.")
            }
        }
    });
}