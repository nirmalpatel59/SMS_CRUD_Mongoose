let mongoose = require('mongoose')
let Schema = mongoose.Schema

let examSchema = new Schema({
  exam_id: {type: String, required: true, unique: true},
  exam_name: { type: String, required: true },
  type: { type: String, required: true },
  total_marks: { type: Number, required: true },
  standard: { type: Number, required: true },
  standard_stream: { type: String },
  subject: { type: String },
  created_by: { type: Schema.ObjectId, ref: 'users' },
  duration: {type: Number},
  duration_type: { type: String },
  passing_marks: {type: Number},
  updated_at: { type: String, default: Date.now() },
  created_at: { type: String, default: Date.now() },
  exam_date: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('exams', examSchema)
