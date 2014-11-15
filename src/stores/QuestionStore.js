"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
// var ChatMessageUtils = require('../utils/ChatMessageUtils');
var {EventEmitter} = require('events');
// var ThreadStore = require('../stores/ThreadStore');
var assign = require('object-assign');
// var localStorage = require("localStorage");

var {ActionTypes} = AppConstants;
var CHANGE_EVENT = 'change';

// if (!localStorage.questions) {
//   localStorage.questions = JSON.stringify({ '5': {}, '6': {}, '7': {} });
// }

// var _questions = JSON.parse(localStorage.questions);

var _questions = { '5': {}, '6': {}, '7': {} };

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

  get (query) {
    var {candidateId, policyId, qid} = query;
    console.log(query, _questions);
    return _questions[candidateId][policyId][qid];
  },

  getAll () {
    return _questions;
  },

  getAllFrom (cid, pid) {
    if (!_questions[cid][pid]) {
      return [];
    }

    return Object.keys(_questions[cid][pid]).map((q) => {
      return _questions[cid][pid][q];
    });
  },

  getCreatedQuestionData (question) {
    var {policyId, title, content, candidateId, author} = question;
    var timestamp = new Date().getTime();
    return {
      // TODO: soidid說要用uuid
      id: 'q_' + timestamp,
      title: title,
      content: content,
      author: author,
      signatures: [{ uid: author.uid, signedAt: timestamp}],
      createdAt: timestamp,
      policyId: policyId,
      candidateId: candidateId
    };
  },

  save () {
    localStorage.questions = JSON.stringify(_questions);
  }
});

QuestionStore.dispatchToken = AppDispatcher.register((payload) => {
  var {action} = payload;
  switch(action.type) {
    case ActionTypes.CREATE_QUESTION:
      var question = QuestionStore.getCreatedQuestionData(action.question);
      var {policyId, id, candidateId} = question;
      if (!_questions[candidateId][policyId]) {
        _questions[candidateId][policyId] = {};
      }
      _questions[candidateId][policyId][id] = question;
      // QuestionStore.save();
      QuestionStore.emitChange();
      break;
    case ActionTypes.SIGN_QUESTION:
      var {signInfo} = action;
      var {cid, pid, qid, uid, signedAt} = signInfo;
      _questions[cid][pid][qid].signatures.push({
        uid: uid,
        signedAt: signedAt
      });
      // QuestionStore.save();
      QuestionStore.emitChange();

    case ActionTypes.SAVE_QUESTIONS:
      var {query, data} = action;
      var {cid, pid} = query;
      data.map( (q) => {
        if (!_questions[cid][pid]) {
          _questions[cid][pid]= {};
        }
        _questions[cid][pid][q.id] = q;
      });
      QuestionStore.emitChange();
    default:
  }

});

module.exports = QuestionStore;