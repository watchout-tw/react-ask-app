"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var {EventEmitter} = require('events');
var assign = require('object-assign');
var localStorage = require("localStorage");
var {ActionTypes} = AppConstants;
var CHANGE_EVENT = 'change';

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

  saveToken (res) {
    var {token, user} = res;
    if(localStorage.token) {
      return;
    }
    localStorage.token = JSON.stringify(token);
    localStorage.user = JSON.stringify(user);
  },

  getToken () {
    return localStorage.token;
  },

  logout () {
    delete localStorage.token;
    delete localStorage.user;
  },

  loggedIn () {
    return !!localStorage.token;
  },

  get () {
    // if (localStorage.user) {
    //   return JSON.parse(localStorage.user);
    // }
    return {};
  }
});

UserStore.dispatchToken = AppDispatcher.register((payload) => {
  var {action} = payload;
  switch(action.type) {
    case ActionTypes.LOGOUT:
      console.log(action);
      UserStore.logout();
      UserStore.emitChange();
      break;
    default:
  }

});

module.exports = UserStore;