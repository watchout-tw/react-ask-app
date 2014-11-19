var passport =require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var jwt = require("jsonwebtoken");
var api = require("express").Router({caseSensitive: true, strict: true});
var uid = require("uid2");
var config = require("../config/config");
var User = require("./models/User");
var Question = require("./models/Question");
var LIMIT = 10;
var SORT = '-signaturesCount';

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(obj, done) {
  return done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: config.FACEBOOK_APP_CALLBACK,
    passReqToCallback : true,
    profileFields: ['id', 'displayName', 'name', 'gender', 'birthday', 'profileUrl', 'emails', 'photos', 'age_range', 'locale', 'location', 'timezone']
  },
  function (req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOrCreate({facebookId: profile.id}, {
        id: uid(16),
        facebookId: profile.id,
        facebookData: profile,
        createdAt: new Date
      },function (err, user){
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    });
  }
));


var allClosedAt = {
  '1': { closedAt: new Date('2014','10','23','23','59','59').getTime() }
};

function filterSignatures(questions) {
  var result = questions.map(function (q) {
    var signs = q.signatures.map(function (s) {
      return s.user.id;
    });
    return {
      id: q.id,
      cid: q.cid,
      pid: q.pid,
      title: q.title,
      content: q.content,
      createdAt: q.createdAt,
      author: q.author,
      signatures: signs,
      signaturesCount: q.signaturesCount
    };
  });
  return result;
}

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
  var token = jwt.sign({user: req.user.id}, config.tokenSecret);

  return res.json({
    authenticated: true,
    token: token,
    user: {
      id: req.user.id,
      name: req.user.facebookData.displayName,
      avatar: req.user.facebookData._json.picture.data.url
    }
  });

});

api.get('/logout', function (req, res) {
  req.logout();
  return res.json({
    status: "success",
    message: "Logout successed"
  });
});

api
  .get('/questions', function (req, res) {
    var cid = req.query.cid;
    var pid = req.query.pid;
    var qid = req.query.qid;
    var skip = req.query.skip;
    var selected = false;

    if (!cid) {
      return res.json({
        status: 'failed',
        message: 'Must include cid'
      });
    }

    if(!pid) {
      return Question
        .find({cid: cid})
        .sort(SORT)
        .exec(function (err, questions) {
          if (err) {
            return console.log(err);
          }
          return res.json({
            status: "success",
            data: filterSignatures(questions)
          });
      });
    }

    if(qid && !skip) {
      return Question.findOne({id: qid}, function (err, question){
        var result = filterSignatures([question]);
        return res.json({
          status: 'success',
          data: result
        });
      });
    } else {
      if(!qid) {
        qid = '';
      }
      Question
        .find({cid: cid, pid:pid })
        .ne('id', qid)
        .limit(LIMIT)
        .skip(skip)
        .sort(SORT)
        .exec(function (err, questions) {
          if (err) {
            return console.log(err.stack);
          }
          var result = filterSignatures(questions);
          return res.json({
            status: 'success',
            data: result
          });
        });
    }
  })
  .post('/questions', function (req, res) {
    if(!req.user) {
      return res.json({
        status: 'failed',
        message: 'Not authenticated'
      });
    }

    var newQuestion = req.body.question;
    var createdAt = new Date();
    var closedAt = allClosedAt[newQuestion.cid].closedAt;
    if( createdAt.getTime() > closedAt) {
      return res.json({
        status: 'failed',
        message: 'Event was closed'
      });
    }
    Question.findOrCreate({title: newQuestion.title, cid: newQuestion.cid, pid: newQuestion.pid}, {
      id: uid(16),
      cid: newQuestion.cid,
      pid: newQuestion.pid,
      title: newQuestion.title,
      content: newQuestion.content,
      author: newQuestion.author,
      signatures: [{
        user: newQuestion.author,
        timestamp: createdAt.getTime()
      }],
      signaturesCount: 1,
      createdAt: createdAt
    }, function (err, question) {
      if (err) {
        return console.log(err.stack);
      }
      // save signatures in user
      User.findOne({id: newQuestion.author.id}, function (err, user) {
        if (err) {
          return console.log(err.stack);
        }
        user.signatures.push({
          id: question.id,
          timestamp: createdAt.getTime()
        });
        return user.save(function (err) {
          if (err) {
            return console.log(err.stack);
          }
        });
      });
      var signs = question.signatures.map(function (s) {
        return s.user.id;
      });
      return res.json({
        status: 'success',
        data: {
          id: question.id,
          cid: question.cid,
          pid: question.pid,
          title: question.title,
          content: question.content,
          author: question.author,
          signatures: signs,
          createdAt: question.createdAt
        }
      });
    });
  })
  .patch('/questions', function (req, res) {
    if(!req.user) {
      return res.json({
        status: 'failed',
        message: 'Not authenticated'
      });
    }
    var signQuestion = req.body.question;
    var createdAt = new Date();
    var closedAt = allClosedAt[signQuestion.cid].closedAt;
    if( createdAt.getTime() > closedAt) {
      return res.json({
        status: 'failed',
        message: 'Event was closed'
      });
    }

    Question.where({id: signQuestion.id}).findOne(function (err, question) {
      if (err) {
        return console.log(err.stack);
      }
      question.signatures.map(function (s) {
        if (signQuestion.signer.name === s.user.name) {
          return res.json({
            status: "failed",
            message: "already signed"
          });
        }
      });
      // save signature in user
      User.findOne({id: signQuestion.signer.id}, function (err, user) {
        if (err) {
          return console.log(err.stack);
        }
        user.signatures.push({
          id: signQuestion.id,
          timestamp: createdAt.getTime()
        });
        return user.save(function (err) {
          if (err) {
            return console.log(err.stack);
          }
        });
      });

      question.signatures.push({
        user: signQuestion.signer,
        timestamp: createdAt.getTime()
      });

      question.signaturesCount = question.signatures.length;

      question.save(function (err) {
        if (err) {
          return console.log(err.stack);
        }
        return res.json({
          status: "success"
        });
      });
    });
  });

api
  .get('/status', function (req, res) {

    var result = Object.keys(allClosedAt).map(function (key) {
      var  candidate = allClosedAt[key];
      return (new Date().getTime() > candidate.closedAt)? false: true;
    });
    return res.json({
      status: "success",
      data: result
    });
  });

api
  .get('/policies', function (req, res) {
    var cid = req.query.cid;
    var policies = {
      '5': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
      '6': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],
      '7': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    }
    if(!cid) {
      return res.json({
        status: "success",
        message: "Must include cid"
      });
    }
    Question
      .find({cid: cid})
      .exec(function (err, questions){
        var result = policies[cid].map(function (pid) {
          return 0;
        });
        policies[cid].map(function (pid, index) {
          questions.map(function (q) {
            if(~~q.pid === pid) {
              result[index] += 1;
            }
          });
        });
        return res.json({
          status: "success",
          data: result,
          counts: result.length
        });
      });
  });

module.exports = api;