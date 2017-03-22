let express = require("express"),
    app = express(),
    bodyParser = require('body-parser')
    db = require('./utilities/connection');

app.use(bodyParser.json());
app.use("/api/",require("./controllers/user.controller"));

app.listen(3000,function(req,res){
    console.log("server is running on port :: " + 3000);
});