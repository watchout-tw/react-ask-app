var passport =require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID = '374258546065786';
var FACEBOOK_APP_SECRET = '6de782ec153e5f1ea97bff38bdb946c7';
var jwt = require('jsonwebtoken');
var api = require('express').Router({caseSensitive: true, strict: true});


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/api/auth/facebook/callback",
    passReqToCallback : true
  },
  function (req, accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      done(null, profile);
    });
  }
));


api.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

api.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect : '/'
}));

api.get('/token', function (req, res) {
  if (!req.user) {
    return res.json({
      authenticated: false,
      token: null
    });
  }
  var token = jwt.sign({user: req.user.id}, 'sacascasc');
  res.json({
    authenticated: true,
    token: token,
    user: req.user._json
  });

});




module.exports = api;