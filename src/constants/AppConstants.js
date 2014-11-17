var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    CREATE_QUESTION: null,
    SIGN_QUESTION: null,
    CHOOSE_CANDIDATE: null,
    GET_QUESTIONS: null,
    IS_LOGIN: null,
    LOGOUT: null,
    STATUS: null,
    NOTIFY_MESSAGE: null
  }),
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};