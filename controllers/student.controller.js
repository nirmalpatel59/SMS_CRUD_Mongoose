let express = require('express'),
    router = express.Router(),
    studentModal = require("../model/student.model"),
    fs = require('fs');
if(!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}
let logger = require("../utilities/logger.js");
router.get("/getStudent", function (req, res) {
    studentModal.findOne({ "email": req.query.email }, function (err, data) {
        if (err) {
            logger.error(err);
            res.send(err);
        } else {
            if(data) {
                logger.info("User data retreived successfully");
                res.json(data).end();
            } else {
                logger.info("No user found with given details");
                res.send("No user found with given details");
            }
        }
    });
});

router.post("/addStudent", function (req, res) {
    let userInstance = new studentModal({
        email: req.body.email,
        password: req.body.password,
        phone_no: req.body.phone_no
    });
    userInstance.save(function (err, data) {
        if (err) {
            logger.error(err);
            res.json(err).end();
        } else {
            logger.info("user added successfully");
            res.send(data);
        }
    });
});

router.put("/updateStudent", function (req, res) {
    let updatedData = {};
    req.body.phone_no ? updatedData.phone_no = req.body.phone_no : "";
    req.body.password ? updatedData.password = req.body.password : "";
    studentModal.findOneAndUpdate({ "email": req.body.email }, updatedData, { new: true }, function (err, data) {
        if (err) {
            logger.error(err);
            res.send(err);
        } else {
            if (data) {
                logger.info({'message': "user updated successfully", 'user': req.body.email});
                // logger.info("user with emailid " + req.body.email + " updated successfully");
                res.json(data).end();
            } else {
                logger.info("no user found with email id " + req.body.email);
                res.send("No user found  with given details");
            }
        }
    });
});

router.delete("/deleteStudent", function (req, res) {
    studentModal.findOneAndRemove({ "email": req.body.email }, function (err, data) {
        if (err) {
            logger.error(err);
            res.json(err).end();
        } else {
            if (data) {
                logger.info({ 'message': "user deleted successfully", 'user': req.body.email });
                // logger.info("user with emailid " + req.body.email + " removed successfully");
                res.json(data).end();
            } else {
                logger.info("no user found with email id " + req.body.email);
                res.send("No user found with given details");
            }
        }
    });
});

module.exports = router;