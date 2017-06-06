let mongoose = require('mongoose')
let Schema = mongoose.Schema
let config = require('config')
let userSchema = new Schema({
  email: { type: String, required: true },
  password: String,
  phone_no: { type: Number, required: true }
})
userSchema.path('email').validate(function (email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email)
}, 'Email field is invalid')
let userModal = mongoose.model(config.STUDENTS_COLLECTION, userSchema)
module.exports = userModal
