"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var {EventEmitter} = require('events');
var assign = require('object-assign');

var {ActionTypes} = AppConstants;
var CHANGE_EVENT = 'change';


function pretendRequest(email, pass, cb) {
  setTimeout(function() {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7),
        user: { uid:'facebook:' + ~~(Math.random()*10000) }
      });
    } else {
      cb({authenticated: false});
    }
  }, 0);
}

var UserStore = assign({}, EventEmitter.prototype, {

  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  login (email, pass, cb) {
    var cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      cb && cb(true);
      this.onChange(true);
      return;
    }
    pretendRequest(email, pass, function(res) {
      var {token, user} = res;
      if (res.authenticated) {
        localStorage.token = token;
        localStorage.user = JSON.stringify(user);
        cb && cb(true);
        this.onChange(true);
        UserStore.emitChange();
      } else {
        cb && cb(false);
        this.onChange(false);
      }
    }.bind(this));
  },

  getToken () {
    return localStorage.token;
  },

  logout (cb) {
    delete localStorage.token;
    delete localStorage.user;
    cb && cb();
    this.onChange(false);
  },

  loggedIn () {
    return !!localStorage.token;
  },

  onChange () {

  },

  get () {
    if (localStorage.user) {
      return JSON.parse(localStorage.user);
    }
    return {};
  }
});

UserStore.dispatchToken = AppDispatcher.register((payload) => {
  var {action} = payload;
  switch(action.type) {
    default:
  }

});

module.exports = UserStore;