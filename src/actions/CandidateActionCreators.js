"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var {ActionTypes} = AppConstants;

module.exports = {

  chooseCandidate (id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CHOOSE_CANDIDATE,
      id: id
    });
  },

  checkStatus () {
    AppDispatcher.handleViewAction({
      type: ActionTypes.STATUS
    });
  }

};