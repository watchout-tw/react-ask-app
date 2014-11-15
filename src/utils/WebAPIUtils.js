var ServerActionCreators = require("../actions/ServerActionCreators");
var QuestionActionCreators =require("../actions/QuestionActionCreators");
var UserStore = require("../stores/UserStore");
var request = require("superagent");
var TIMEOUT = 10000;

module.exports = {
  login () {
    location.href = '/api/auth/facebook';

  },

  getToken () {
    request
      .get('/api/token')
      .timeout(TIMEOUT)
      .end( function (err, res) {
        if (err) {
          return;
        }
        if (res.body.authenticated) {
          UserStore.saveToken(res.body);
        }
      });
  },

  getQuestions (query, cb) {
    request
      .get('/api/questions')
      .query(query)
      .timeout(TIMEOUT)
      .end(function (err, res) {
        if (err) {
          console.log(err);
        }
        cb(res);
      });
  }

};