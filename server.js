let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let config = require('config')
// let passport = require('passport'),
let session = require('express-session')
let expressJWT = require('express-jwt')
// let jwt = require('jsonwebtoken')
let MongoStore = require('connect-mongo')(session)
// let mongoose = require('mongoose')
require('./utilities/connection')
// let ensureAuthentication = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//   res.redirect('/')
// }

require('./src/config/passport')(app)
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(session({
//     secret: "mysecret",
//     store: new MongoStore({ url: 'mongodb://nirmal:nirmal@localhost:27017/SMS?authSource=admin' })
// }));
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: 'mongodb://nirmal:nirmal@localhost:27017/SMS?authSource=admin' })
}))

app.use('/', expressJWT({ secret: 'mysecret', credentialsRequired: true }).unless(
  {
    path: [
      '/user/signUp',
      '/user/signIn'
    ]
  }))

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.send('No Authorization token is provided. Redirect to Login page')
  }
})

// app.use("/students/",require("./controllers/student.controller"));

app.use('/user/', require('./controllers/auth.controller'))
app.use('/home', function (req, res) {
  console.log(res.send('home page rendered'))
})

app.use('/account', require('./controllers/account.controller'))
app.use('/exams', require('./controllers/exam.controller'))
app.use('/utilities', require('./controllers/utilities.controller'))
app.use('/login', function (req, res) {
  res.send({ 'username': req.session.passport.user })
})

app.listen(config.PORT, function (req, res) {
  console.log('server is running on port :: ' + config.PORT)
})

module.exports = app
