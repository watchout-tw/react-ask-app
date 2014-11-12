var request = require('superagent');
// var {ASYNC, AUTH} = require("./constants");
// var {CompositionActions} = require("");

var API_URL = '/api/v2';
var TIMEOUT = 10000;
var _pendingRequests = {};
var TOKEN_STORAGE_KEY = 'concatAuthToken';

function getTokenFromStorage() {
  var token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!token) {
    token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
  }
  if (token) {
    CompositionActions.setAuthStatus(AUTH.AUTHENTICATED);
  }
  return token;
}

var _token = getTokenFromStorage();

function makeUrl(path) {
  return API_URL + path;
}

function get(url) {
  return request
          .get(url)
          .timeout(TIMEOUT)
          .query({authtoken: _token});
}

function abortPreviousRequest(key) {
  if (_pendingRequests[key]) {
    _pendingRequests._callback = function (){};
    _pendingRequests.abort();
    _pendingRequests[key] = null;
  }
}

function startRequest(key, callback) {
  abortPreviousRequest(key);
  callback(ASYNC.PENDING);
}

function makeDigestFun(callback) {
  return function (err, res) {
    if (err && err.timeout === TIMEOUT) {
      callback(ASYNC.TIMEOUT);
    } else if (res.status === 400) {
      Api.logout();
    } else if (!res.ok) {
      callback(ASYNC.ERROR);
    } else {
      callback(res.body);
    }
  };
}

function makeLoginDigestFun(remember) {
  return function (err, res) {
    if (!res.ok) {
      setAuthStatus(AUTH.FAILED);
    } else {
      setToken(res.body.token, remember);
      setAuthStatus(AUTH.AUTHENTICATED);
    }
  };
}

function setToken(token, remember) {
  _token = token;
  if (remember) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
}

function setAuthStatus(status) {
   if (status !== AUTH.AUTHENTICATED) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      _token = null;
    }
    CompositionActions.setAuthStatus(status);
}

var Api = {

  login (username, password, remember) {
    var url = makeUrl('/authtoken');
    abortPreviousRequest(url);
    _pendingRequests[url] = request
                              .post(url)
                              .auth(username, password)
                              .timeout(TIMEOUT)
                              .end(makeLoginDigestFun(remember));

  },

  logout () {
    setAuthStatus(AUTH.NOT_AUTHENTICATED);
  },

  getEntityData (entityId, callback) {
    var url = makeUrl('/entities/' + entityId);
    var key = 'get-entity-data';
    startRequest(key, callback);
    _pendingRequests[key] = get(url).end(makeDigestFun(callback));
  }
};

module.exports = Api;