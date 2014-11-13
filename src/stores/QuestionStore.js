var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var ChatMessageUtils = require('../utils/ChatMessageUtils');
var {EventEmitter} = require('events');
// var ThreadStore = require('../stores/ThreadStore');
var assign = require('object-assign');

var {ActionTypes} = AppConstants;
var CHANGE_EVENT = 'change';
var _questions = {
  'm_1415792285200': {
    id: 'm_1415792285200',
    title: '你如何理解年輕人在台北市工作生活的巨大經濟壓力感?',
    content: '台北市淪為富豪炒房天堂, 每個認真的年輕人的經濟地獄,請問您的看法與解決方案',
    signatures: ['facebook:1123','facebook:11221312313'],
    createdAt: 1415774421035,
    author: 'facebook:123123123'
  },
  'm_1415792286000': {
    id: 'm_1415792286000',
    title: '您是否願意公開所有競選的收入以及支出提供民眾檢視？',
    content: '選舉經費來源以及支出往往後續造成選後的貪腐以及酬庸。您是否願意將選舉相關財務，無論是收入或是支出部分接受民眾公開檢視？',
    signatures: ['facebook:1123','facebook:11221312313'],
    createdAt: 1415774421035,
    author: 'facebook:123123123'
  }
};

var QuestionStore = assign({}, EventEmitter.prototype, {

  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get (id) {
    return _questions[id];
  },

  getAll () {
    return _questions;
  },

  getCreatedQuestionData (question) {
    var {title, content} = question;
    var timestamp = new Date().getTime();
    return {
      id: 'q_' + timestamp,
      title: title,
      content: content,
      author: 'facebook:11234',
      signatures: [{ uid: 'facebook:11234', signedAt: timestamp}],
      createdAt: timestamp
    };
  }
});

QuestionStore.dispatchToken = AppDispatcher.register((payload) => {
  var {action} = payload;
  switch(action.type) {
    case ActionTypes.CREATE_QUESTION:
      var question = QuestionStore.getCreatedQuestionData(action.question);
      _questions[question.id]=question;
      QuestionStore.emitChange();
      break;
    case ActionTypes.SIGN_QUESTION:
      var {signInfo} = action;
      var {signer, signedAt} = signInfo;
      _questions[signInfo.qid].signatures.push({
        uid: signer,
        signedAt: signedAt
      });
      QuestionStore.emitChange();
    default:
  }

});

module.exports = QuestionStore;