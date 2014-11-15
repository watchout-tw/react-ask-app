"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var {EventEmitter} = require('events');
var assign = require('object-assign');
var WebAPIUtils = require("../utils/WebAPIUtils");
// var localStorage = require("localStorage");
var {ActionTypes} = AppConstants;
var CHANGE_EVENT = 'change';

var _token = null;
var _user = {};

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


  getToken () {
    return localStorage.token;
  },

  logout () {
    // call logout
  },

  checkLogin () {
    WebAPIUtils.getToken();
  },

  saveUser (data) {
    var {token, user} = data;
    _token = token;
    _user = user;
    console.log('saved');
  },

  loggedIn () {
    return !!_token;
  },

  get () {
    return _user;
  }
});

UserStore.dispatchToken = AppDispatcher.register((payload) => {
  var {action} = payload;
  switch(action.type) {
    case ActionTypes.IS_LOGIN:
      WebAPIUtils.getToken((err, res) => {
        if(err) {
          console.log(err);
          return;
        }
        var {authenticated, token, user} = res.body;
        if(authenticated) {
          _token = token;
          _user = user;
          UserStore.emitChange();
        }
      });

      break;
    case ActionTypes.LOGOUT:
      WebAPIUtils.logout( (err, res) => {
        if (err) {
          console.log(err);
        }
        _token = null;
        _user = {};
        UserStore.emitChange();
      });
      break;
    default:
  }

});

module.exports = UserStore;