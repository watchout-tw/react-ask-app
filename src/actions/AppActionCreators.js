"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var {ActionTypes} = AppConstants;

module.exports = {

  notify (message) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.NOTIFY_MESSAGE,
      message: message
    });
  }

};