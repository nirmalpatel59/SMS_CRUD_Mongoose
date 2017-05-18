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
let userModal = mongoose.model('students', userSchema);
module.exports = userModal;