let mongoose = require('mongoose')
let Schema = mongoose.Schema

let newsSchema = new Schema({
  added_by: { type: String },
  message: { type: String },
  status: { type: String },
  end_date: { type: Date },
  newsId: { type: String, unique: true },
  type: { type: String }
}, {
  timestamps: true
})
// TODO :: create announcement schema based on result schema
let announcementSchema = new Schema({
  added_by: { type: String },
  message: { type: String },
  status: { type: String },
  ancId: { type: String },
  type: { type: String },
  end_date: { type: Date }
}, {
  timestamps: true
})

module.exports = {
  newsModel: mongoose.model('news', newsSchema),
  announcementModel: mongoose.model('announcement', announcementSchema)
}
