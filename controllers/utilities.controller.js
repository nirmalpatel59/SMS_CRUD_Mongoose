let express = require('express')
let router = express.Router()

router.get('/news', getLatestNews)

// TODO create methods to get news and announcement

function getLatestNews (req, res) {
  var newsObj = {
    days: req.params.days,
    added_by_name: { type: String },
    msg: { type: String },
    status: { type: String }
  }
}
