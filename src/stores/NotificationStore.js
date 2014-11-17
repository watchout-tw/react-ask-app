"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var {EventEmitter} = require('events');
var assign = require('object-assign');

var {ActionTypes} = AppConstants;
var CHANGE_EVENT = 'change';

var _message = '';

var NotificationStore = assign({}, EventEmitter.prototype, {

  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getMessage() {
    return _message;
  }
});

NotificationStore.dispatchToken = AppDispatcher.register((payload) => {
  var {action} = payload;
  switch(action.type) {
    case ActionTypes.NOTIFY_MESSAGE:
      _message = action.message;
      NotificationStore.emitChange();
      break;
    default:
  }

});

module.exports = NotificationStore;