var passport =require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var jwt = require("jsonwebtoken");
var api = require("express").Router({caseSensitive: true, strict: true});
var uid = require("uid2");
var config = require("../config/config");
var User = require("./models/User");
var Question = require("./models/Question");


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
  '5': { closedAt: new Date('2014','10','17','23','59','59').getTime() },
  '6': { closedAt: new Date('2014','10','20','23','59','59').getTime() },
  '7': { closedAt: new Date('2014','9','29','23','59','59').getTime() }
};

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
    if (!cid && !pid) {
      return res.json({
        status: 'failed',
        message: 'Must include cid and pid'
      });
    }
    Question.find({cid: cid, pid:pid}, function (err, questions) {
      if (err) {
        return res.error(err.stack);
      }
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
          signatures: signs
        };
      });
      return res.json({
        status: 'success',
        data: result
      });
    });
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
      createdAt: createdAt
    }, function (err, question) {
      if (err) {
        return res.error(err.stack);
      }
      // save signatures in user
      User.findOne({id: newQuestion.author.id}, function (err, user) {
        if (err) {
          return res.error(err.stack);
        }
        user.signatures.push({
          id: question.id,
          timestamp: createdAt.getTime()
        });
        return user.save(function (err) {
          if (err) {
            return res.error(err.stack);
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
        return res.error(err.stack);
      }
      question.signatures.map(function (s) {
        if (signQuestion.sginer.name === s.user.name) {
          return res.json({
            status: "failed",
            message: "already signed"
          });
        }
      });
      // save signature in user
      User.findOne({id: signQuestion.signer.id}, function (err, user) {
        if (err) {
          return res.error(err.stack);
        }
        user.signatures.push({
          id: signQuestion.id,
          timestamp: createdAt.getTime()
        });
        return user.save(function (err) {
          if (err) {
            return res.error(err.stack);
          }
        });
      });

      question.signatures.push({
        user: signQuestion.signer,
        timestamp: createdAt.getTime()
      });

      question.save(function (err) {
        if (err) {
          return res.error(err.stack);
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

module.exports = api;