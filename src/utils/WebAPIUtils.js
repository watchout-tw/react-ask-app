// var UserStore = require("../stores/UserStore");
var UserActionCreators = require("../actions/UserActionCreators");
var request = require("superagent");
var TIMEOUT = 10000;
var API = '/api';


function makeURL (path) {
  return API + path;
}

module.exports = {
  login () {
    return location.href = makeURL('/auth/facebook');
  },

  getToken (cb) {
    request
      .get(makeURL('/token'))
      .timeout(TIMEOUT)
      .end( function (err, res) {
        cb(err, res);
      });
  },

  logout (cb) {
    request
      .get(makeURL('/logout'))
      .timeout(TIMEOUT)
      .end(function (err, res) {
        cb(err, res);
      });
  },

  getQuestions (query, cb) {
    request
      .get(makeURL('/questions'))
      .query(query)
      .timeout(TIMEOUT)
      .end(function (err, res) {
        return cb(err, res);
      });
  },

  postQuestion (question, cb) {
    request
      .post(makeURL('/questions'))
      .send({question: question})
      .timeout(TIMEOUT)
      .end(function (err, res) {
        return cb(err, res);
      });
  },

  signQuestion (signInfo, cb) {
    request
      .patch(makeURL('/questions'))
      .send({question: signInfo})
      .timeout(TIMEOUT)
      .end(function (err, res) {
        return cb(err, res);
      });
  },

  checkStatus (cb) {
    request
      .get(makeURL('/status'))
      .timeout(TIMEOUT)
      .end(function (err, res) {
        return cb(err, res);
      });
  }

};