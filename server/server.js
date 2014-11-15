var express = require("express");
var passport =require("passport");
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require("mongoose");
var config = require("./config/config");
var app = express();

var port = process.env.PORT || 8080;

mongoose.connect(config.database);
mongoose.connection.on('error', function (err) {
  console.log(err);
});


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: config.sessionSecret,
  store: new MongoStore({
    db: mongoose.connection.db
  })
 }));
app.use(passport.initialize());
app.use(passport.session());

//return static assets
app.use(express.static("./public"));

//echo api route
app.use('/api', require('./api/api'));

//render the app server side
app.use('/', require('./render/render'));

app.listen(port);

console.log('App started goto - http://0.0.0.0:' + port);