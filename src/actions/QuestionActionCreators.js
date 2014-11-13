var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

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
  }

};