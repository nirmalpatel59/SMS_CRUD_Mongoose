let mongoose = require('./mongoose')
let Schema = mongoose.Schema

let newsSchema = new Schema({
  added_by: { type: String },
  added_by_name: { type: String },
  msg: { type: String },
  status: { type: String }
}, {
  timestamp: true
})

let announcementSchema = new Schema({
  added_by: { type: String },
  added_by_name: { type: String },
  msg: { type: String },
  status: { type: String }
}, {
  timestamp: true
})

module.exports = {
  newsModel: mongoose.model('news', newsSchema),
  announcementModel: mongoose.model('announcement', announcementSchema)
}
