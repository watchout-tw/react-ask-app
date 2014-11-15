"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var WebAPIUtils = require("../utils/WebAPIUtils");
var {EventEmitter} = require('events');
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

  save () {
    localStorage.questions = JSON.stringify(_questions);
  }
});

QuestionStore.dispatchToken = AppDispatcher.register((payload) => {
  var {action} = payload;
  switch(action.type) {
    case ActionTypes.CREATE_QUESTION:
      WebAPIUtils.postQuestion(action.question, function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
        // console.log(err, res);
        // console.log(res.body.data);
        var {pid, id, cid} = res.body.data;
        if (!_questions[cid][pid]) {
          _questions[cid][pid] = {};
        }
        _questions[cid][pid][id] = res.body.data;
        QuestionStore.emitChange();
      });
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
      break;
    case ActionTypes.GET_QUESTIONS:
      WebAPIUtils.getQuestions(action.query, function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
        var {query} = action;
        var {cid, pid} = query;
        res.body.data.map( (q) => {
          if (!_questions[cid][pid]) {
            _questions[cid][pid]= {};
          }
          _questions[cid][pid][q.id] = q;
        });
        QuestionStore.emitChange();
      });
      break;
    default:
  }

});

module.exports = QuestionStore;