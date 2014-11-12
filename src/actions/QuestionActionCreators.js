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

  signQuestion (questionId, signer) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SIGN_QUESTION,
      questionId: questionId,
      signer: signer
    });
  }

};