let express = require('express')
let router = express.Router()
let moment = require('moment')
let services = require('../services/utilities.service.js')

router.get('/news', getLatestNews)
router.post('/news', addLatestNews)
router.put('/news', updateLatestNews)

module.exports = router

function getLatestNews (req, res) {
  services.getLatestNews().then(function (data) {
    res.send(data)
  }).catch(function (err) {
    console.log(err)
    res.send(err)
  })
}

function addLatestNews (req, res) {
  console.log(req.user)
  var eDate = moment(req.body.end_date, 'DD-MM-YYYY')
  eDate.set({ 'hours': 23, 'minutes': 59, 'seconds': 59 })
  eDate = eDate.utc()
  let reqObj = {
    added_by: req.user.username,
    end_date: eDate,
    message: req.body.message,
    type: req.body.type,
    status: req.body.status || 'active',
    newsId: req.body.type + '_' + Math.floor(Math.random() * 1000)
  }
  services.addLatestNews(reqObj).then(function (data) {
    console.log('data successfully added')
    res.send(data)
  }).catch(function (err) {
    console.log(err)
    res.send(err).status(500)
  })
}

function updateLatestNews (req, res) {
  var eDate = moment(req.body.end_date, 'DD-MM-YYYY')
  eDate.set({ 'hours': 23, 'minutes': 59, 'seconds': 59 })
  eDate = eDate.utc()
  let reqObj = {
    added_by: req.user.username,
    end_date: eDate,
    message: req.body.message,
    type: req.body.type,
    status: req.body.status || 'active',
    newsId: req.body.newsId
  }
  services.updateLatestNews(reqObj).then(function (data) {
    res.send(data)
  }).catch(function (err) {
    console.log(err)
    res.send(err).status(500)
  })
}
