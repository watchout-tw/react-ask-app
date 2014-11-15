var UserStore = require("../stores/UserStore");
var request = require("superagent");
var TIMEOUT = 10000;
var API = '/api';


function makeURL (path) {
  return API + path;
}

module.exports = {
  login () {
    location.href = makeURL('/auth/facebook');

  },

  getToken (cb) {
    request
      .get(makeURL('/token'))
      .timeout(TIMEOUT)
      .end( function (err, res) {
        cb(err, res);
        // if (err) {
        //   return;
        // }
        // if (res.body.authenticated) {
        //   UserStore.saveToken(res.body);
        // }
      });
  },

  getQuestions (query, cb) {
    request
      .get(makeURL('/questions'))
      .query(query)
      .timeout(TIMEOUT)
      .end(function (err, res) {
        cb(err, res);
      });
  },

  postQuestion (question, cb) {
    request
      .post(makeURL('/questions'))
      .send({question: question})
      .timeout(TIMEOUT)
      .end(function(err, res) {
        cb(err, res);
      });
  }

};