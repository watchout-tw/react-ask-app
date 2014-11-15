"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var WebAPIUtils = require("../utils/WebAPIUtils");
var {ActionTypes} = AppConstants;

module.exports = {

  createQuestion (question) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_QUESTION,
      question: question
    });
  },

  signQuestion (signInfo) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SIGN_QUESTION,
      signInfo: signInfo
    });
  },

  getQuestions (query) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.GET_QUESTIONS,
      query: query
    });
  }

};