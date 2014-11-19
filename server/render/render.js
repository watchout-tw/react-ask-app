require('node-jsx').install({harmony: true});

var fs = require("fs");
var React = require("react/addons");

var Router = require("react-router");

var app_router = require("../../src/AppRouter");
var router = require('express').Router({caseSensitive: true, strict: true});
var Question = require("../api/models/Question");

//only read on startup
var template = fs.readFileSync(__dirname + "/../../public/app.html", {encoding:'utf8'});
//wildcard route to pass to react client app

function _render(req, res, options) {
  var title = (options && options.title) || '李前市長給問嗎？';
  var description = (options && options.description) || '台北市長選舉在即，你/妳準備好要投給誰了嗎？沃草特別為大家邀請到「前」台北市長，也是前總統李登輝先生來接受網友們的提問挑戰！這是李登輝先生首次接受網路提問以及直播的邀約。兩個小時的問答，讓你/妳了解台北城發展的歷史脈絡以及李登輝先生經營城市的理念，也讓我們看看高齡九十一歲的李前總統如何應對新世代網友的提問挑戰！' ;

  Router.renderRoutesToString(app_router, req.originalUrl, function(error, abortReason, string){
    var html = template.replace(/\{\{body\}\}/, string);
    html = html.replace(/\{\{title\}\}/, title);
    html = html.replace(/\{\{description\}\}/, description);
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

router.get('/candidates/:candidateId/policies/:policyId?', function (req, res) {
  var candidateId = req.param('candidateId');
  var policyId = ~~req.param('policyId');
  var qid = req.query.qid;
  var options = {};
  if(qid) {
    return Question
      .findOne({id: qid})
      .exec(function (err, question) {
        return _render(req, res, {
          title: question.title,
          description: question.content
        });
      });
  }
  var policies = JSON.parse(fs.readFileSync(__dirname + '/policies.json', {encoding:'utf8'}));
  var policy = policies[candidateId][policyId];
  if ('5' === candidateId && policyId >= 1 && policyId <= 27) {
    return _render(req, res, {
      title: policy.title,
      description: String(policy.content).replace(/<[^>]+>/gm, '').replace(/&nbsp;/gi,' ').substring(0,200)
    });
  }
  if ('6' === candidateId && policyId >= 1 && policyId <= 34) {
    return _render(req, res, {
      title: policy.title,
      description: String(policy.content).replace(/<[^>]+>/gm, '').replace(/&nbsp;/gi,' ').substring(0,200)
    });
  }
  if ('7' === candidateId && policyId >=1 && policyId <= 30) {
    return _render(req, res, {
      title: policy.title,
      description: String(policy.content).replace(/<[^>]+>/gm, '').replace(/&nbsp;/gi,' ').substring(0,200)
    });
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