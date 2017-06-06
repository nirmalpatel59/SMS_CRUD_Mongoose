let mongoose = require('mongoose')
let Schema = mongoose.Schema
let config = require('config')
let passportLocalMongoose = require('passport-local-mongoose')
let userSchema = new Schema({
  first_name: {type: String, required: true},
  middle_name: { type: String },
  last_name: { type: String, required: true },
  marital_status: { type: String },
  gender: { type: String, required: true },
  email: { type: String },
  phone_no: { type: String, required: true, unique: true },
  date_of_joining: { type: String },
  date_of_birth: { type: String },
  role: { type: String, required: true },
  status: { type: String, default: 'active' },
  type: { type: String, required: true },
  password: { type: String },
  updated_at: { type: String, default: Date.now() },
  created_at: { type: String, default: Date.now() },
  academics: {type: Array},
  specialization: {type: Array},
  major_specialization: {type: String},
  standard_association: {type: Array},
  current_standard_association: {type: Array}
})
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model(config.USERS_COLLECTION, userSchema)
