var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    CREATE_QUESTION: null,
    SIGN_QUESTION: null,
    CHOOSE_CANDIDATE: null
  }),
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};