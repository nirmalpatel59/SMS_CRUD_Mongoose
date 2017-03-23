let express = require("express"),
    app = express(),
    router = express.Router(),
    userModal = require("../model/user.model.js");

router.get("/",function(req,res) {
    userModal.findOne({"username":req.session.passport.user}, function (err, data) {
        
    });
});

router.get("/getStudent", function (req, res) {
    studentModal.findOne({ "email": req.query.email }, function (err, data) {
        if (err) {
            logger.error(err);
            res.send(err);
        } else {
            if (data) {
                logger.info("User data retreived successfully");
                res.json(data).end();
            } else {
                logger.info("No user found with given details");
                res.send("No user found with given details");
            }
        }
    });
});

module.exports = router;
