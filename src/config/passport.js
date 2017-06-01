let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let user = require('../../model/user.model.js')
module.exports = function (app) {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy(user.authenticate()))
  passport.serializeUser(user.serializeUser())
  passport.deserializeUser(user.deserializeUser())
}
