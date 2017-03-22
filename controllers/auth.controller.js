let express = require('express'),
    router = express.Router(),
    passport = require("passport"),
    userModal = require("../model/user.model"),
    logger = require("../utilities/logger.js"),
    app = express();
router.get("/signUp", function(req, res) {
    res.send("Registration form displayed");
});
router.post("/signUp", function (req, res) {
    let userInstance = new userModal({
        username: req.body.phone_no,
        first_name : req.body.first_name,
        last_name  : req.body.last_name,
        middle_name : req.body.middle_name || "",
        marital_status: req.body.marital_status || "",
        gender: req.body.gender,
        email : req.body.email || "",
        phone_no : req.body.phone_no,
        date_of_joining : req.body.date_of_joining || "",
        date_of_birth : req.body.date_of_birth || "",
        role : req.body.role || "",
        type : req.body.type || "",
        academics : req.body.academics || "",
        specialization : req.body.specialization || "",
        major_specialization : req.body.major_specialization || "",
        standard_association : req.body.standard_association || "",
        current_standard_association : req.body.current_standard_association || "",
    });
    // res.send(req.body);
    userModal.register(userInstance,req.body.password,function(err, data) {
        if(err) {
            console.log("in if");
            logger.error(err);
            res.send(err);
        } else {
            console.log("in else");
            logger.info("User registered successfully");
            res.send(data);
        }
    });
});

router.post('/signIn', passport.authenticate('local'), function (req, res) {
    res.redirect('/login');
});
module.exports = router;