require('node-jsx').install({harmony: true});

var fs = require("fs");
var React = require("react/addons");

var Router = require("react-router");

var app_router = require("../../src/AppRouter");
var router = require('express').Router({caseSensitive: true, strict: true});

//only read on startup
var template = fs.readFileSync(__dirname + "/../../public/app.html", {encoding:'utf8'});
//wildcard route to pass to react client app

function _render(req, res) {
  Router.renderRoutesToString(app_router, req.originalUrl, function(error, abortReason, string){
    var html = template.replace(/\{\{body\}\}/, string);
    html = html.replace(/\{\{initialData\}\}/, JSON.stringify({}));
    return res.send(html);
  });
}

router.get(['/','/qa', 'terms', '/contact'], function(req, res) {
  return _render(req, res);
});

router.get('/candidates/:candidateId/policies', function (req, res) {
  var candidateId = req.param('candidateId');
  if ('5' === candidateId || '6' === candidateId || '7' === candidateId) {
    return _render(req, res);
  } else {
    return res.redirect('/');
  }

});

router.get('/candidates/:candidateId/policies/:policyId', function (req, res) {
  var candidateId = req.param('candidateId');
  var policyId = ~~req.param('policyId');

  if ('5' === candidateId && policyId >= 1 && policyId <= 27) {
    return _render(req, res);
  }
  if ('6' === candidateId && policyId >= 1 && policyId <= 34) {
    return _render(req, res);
  }
  if ('7' === candidateId && policyId >=1 && policyId <= 30) {
    return _render(req, res);
  }
  return res.redirect("/");
});

router.get('/candidates/:candidateId/questions', function (req, res) {
  var candidateId = req.param('candidateId');

  if ('5' === candidateId || '6' === candidateId || '7' === candidateId) {
    return _render(req, res);
  }
  return res.redirect("/");
});


router.get('*', function (req, res) {
  return res.redirect('/');
});

module.exports = router;