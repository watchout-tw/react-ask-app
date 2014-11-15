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



router.get(['/','/qa', 'terms', '/contact'], function(req, res) {
  Router.renderRoutesToString(app_router, req.originalUrl, function(error, abortReason, string){
    var html = template.replace(/\{\{body\}\}/, string);
    html = html.replace(/\{\{initialData\}\}/, JSON.stringify({}));
    return res.send(html);
  });
});

router.get('/candidates/:candidateId/policies', function (req, res) {
  var candidateId = req.param('candidateId');
  if ('5' === candidateId || '6' === candidateId || '7' === candidateId) {
    Router.renderRoutesToString(app_router, req.originalUrl, function(error, abortReason, string){
      var html = template.replace(/\{\{body\}\}/, string);
      html = html.replace(/\{\{initialData\}\}/, JSON.stringify({}));
      return res.send(html);
    });
  } else {
    return res.redirect('/');
  }

});

router.get('/candidates/:candidateId/policies/:policyId', function (req, res) {
  var candidateId = req.param('candidateId');
  var policyId = ~~req.param('policyId');
  switch(candidateId) {
    case '5':
      console.log(policyId);
      if (policyId < 1 || policyId > 27) {
        return res.redirect('/');
      }
      break;
    case '6':
      if (policyId < 1 || policyId > 34) {
        return res.redirect('/');
      }
      break;
    case '7':
      if (policyId < 1 || policyId > 30) {
        return res.redirect('/');
      }
      break;
    default:
      Router.renderRoutesToString(app_router, req.originalUrl, function(error, abortReason, string){
        var html = template.replace(/\{\{body\}\}/, string);
        html = html.replace(/\{\{initialData\}\}/, JSON.stringify({}));
        return res.send(html);
      });
  }
});

router.get('*', function (req, res) {
  return res.redirect('/');
});

module.exports = router;