let mongoose = require('mongoose')
let Schema = mongoose.Schema
let config = require('config')

let examSchema = new Schema({
  exam_id: {type: String, required: true, unique: true},
  exam_name: { type: String, required: true },
  type: { type: String, required: true },
  total_marks: { type: Number, required: true },
  standard: { type: Number, required: true },
  medium: { type: String, required: true },
  standard_stream: { type: String },
  subject: { type: String },
  created_by: { type: Schema.ObjectId, ref: config.USERS_COLLECTION },
  duration: { type: Number },
  duration_type: { type: String },
  passing_marks: { type: Number },
  exam_date: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model(config.EXAMS_COLLECTION, examSchema)
