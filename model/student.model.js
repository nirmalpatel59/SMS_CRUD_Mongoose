let mongoose = require('mongoose'),
    Schema = mongoose.Schema;
let userSchema = new Schema({
    email: { type: String, required: true },
    password: String,
    phone_no: { type: Number, required: true }
});
userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'Email field is invalid');
let userModal = mongoose.model('users', userSchema);
module.exports = userModal;


// let mongoose = require('mongoose'),
//     Schema = mongoose.Schema;
// let userSchema = new Schema({
//     doctype:{type: String, required: true},
//     user_id: { type: String, required: true, unique:true },
//     first_name:{type: String, required: true},
//     middle_name: { type: String },
//     last_name: { type: String, required:true },
//     marital_status: { type: String},
//     gender: { type: String, required: true },
//     email: { type: String },
//     phone_no: { type: String, required: true },
//     date_of_joining: { type: String },
//     date_of_birth: { type: String, required: true },
//     role: { type: String, required: true },
//     status: { type: String, default: 'active' },
//     type: { type: String, required: true },
//     password: { type: String, required: true },
//     updated_at: { type: String },
//     created_at: { type: String },
//     academics: {type: Array},
//     specialization: {type: Array},
//     major_specialization:{type: String},
//     standard_association: {type: Array},
//     current_standard_association:{type: Array}
// })
// module.exports = userModal;