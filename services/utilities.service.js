let Q = require('q')
let services = {}
let moment = require('moment')
let NewsModel = require('../model/utilities.model').newsModel

services.getLatestNews = getLatestNews
services.addLatestNews = addLatestNews
services.updateLatestNews = updateLatestNews
module.exports = services

function getLatestNews () {
  let deferred = Q.defer()
  let dDate = moment()
  dDate.set({ 'hours': 0, 'minutes': 0, 'seconds': 0 })
  dDate = dDate.utc()
  NewsModel.find({ status: 'active', end_date: { '$gte': dDate } }, function (err, data) {
    if (!err) {
      console.log(data)
      deferred.resolve(data)
    } else {
      console.log(err)
      deferred.reject(data)
    }
  })
  return deferred.promise
}

function addLatestNews (reqObj) {
  let deferred = Q.defer()
  let newsInstance = new NewsModel({
    added_by: reqObj.added_by,
    message: reqObj.message,
    status: reqObj.status,
    end_date: reqObj.end_date,
    type: reqObj.type,
    newsId: reqObj.newsId
  })
  newsInstance.save(function (err, data) {
    if (!err) {
      console.log(data)
      deferred.resolve(data)
    } else {
      console.log(err)
      deferred.reject(err)
    }
  })
  return deferred.promise
}

function updateLatestNews (reqObj) {
  let deferred = Q.defer()
  let newsInstance = {
    added_by: reqObj.added_by,
    message: reqObj.message,
    status: reqObj.status,
    end_date: reqObj.end_date,
    type: reqObj.type,
    newsId: reqObj.newsId
  }
  NewsModel.findOneAndUpdate({ 'newsId': reqObj.newsId }, newsInstance, { new: true }, function (err, data) {
    if (!err) {
      console.log(data)
      deferred.resolve(data)
    } else {
      console.log(err)
      deferred.reject(err)
    }
  })
  return deferred.promise
}
