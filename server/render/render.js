require('node-jsx').install({harmony: true});
var passport =require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID = '374167926074848';
var FACEBOOK_APP_SECRET = '8797ff88c0f5c73a112d7d507666d262';

var fs = require("fs");
var React = require("react/addons");

var Router = require("react-router");

var app_router = require("../../src/AppRouter");
var router = require('express').Router({caseSensitive: true, strict: true});

//only read on startup
var template = fs.readFileSync(__dirname + "/../../public/app.html", {encoding:'utf8'});
//wildcard route to pass to react client app


router.get('*', function(req, res) {
  if(req.url == '/favicon.ico'){
    return res.status(404).end();
  }

  Router.renderRoutesToString(app_router, req.originalUrl, function(error, abortReason, string){
    var html = template.replace(/\{\{body\}\}/, string);
    html = html.replace(/\{\{initialData\}\}/, JSON.stringify({}));
    res.send(html);
  });
});

module.exports = router;