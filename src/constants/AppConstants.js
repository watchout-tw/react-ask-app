var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    CREATE_QUESTION: null,
    SIGN_QUESTION: null,
    CHOOSE_CANDIDATE: null,
    IS_LOGIN: null,
    LOGOUT: null,
    GET_QUESTIONS: null
    // POST_QUESTION: null
  }),
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};