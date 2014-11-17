"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var WebAPIUtils = require("../utils/WebAPIUtils");
var {EventEmitter} = require('events');
var assign = require('object-assign');

var {ActionTypes} = AppConstants;
var CHANGE_EVENT = 'change';

var _questions = { '5': {}, '6': {}, '7': {} };
var _counts = { '5': {}, '6': {}, '7': {} };

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
    var {cid, pid, qid} = query;
    return _questions[cid][pid][qid];
  },

  getAll () {
    return _questions;
  },

  //TODO: refactor
  getQuestionsFrom (cid) {
    var result = [];
    Object.keys(_questions[cid]).map((p)=> {
      result = result.concat(Object.keys(_questions[cid][p]).map((q) => {
        return _questions[cid][p][q];
      }));
    });
    return result;
  },

  getAllFrom (cid, pid) {
    if (!_questions[cid][pid]) {
      return [];
    }

    return Object.keys(_questions[cid][pid]).map((q) => {
      return _questions[cid][pid][q];
    });
  },

  getCount (query) {
    var {cid, pid} = query;
    if (!_counts[cid][pid]) {
      return -1;
    }
    return _counts[cid][pid];
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
      var {cid, pid, id, signer} = signInfo;
      WebAPIUtils.signQuestion(signInfo, function (err, res) {
        _questions[cid][pid][id].signatures.push(signer.name);
        QuestionStore.emitChange();
      });
      break;
    case ActionTypes.GET_QUESTIONS:
      WebAPIUtils.getQuestions(action.query, function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
        var {query} = action;
        var {cid, pid} = query;
        if (res.body.data) {
          if (0 === res.body.data.length) {
            // workaround right now
            // _counts[cid][pid]= Object.keys(_questions[cid][pid]).length;
            _counts[cid][pid] = 1;
          } else {
            res.body.data.map( (q) => {
              if (!_questions[cid][q.pid]) {
                _questions[cid][q.pid]= {};
              }
              _counts[cid][q.pid]= -1;
              _questions[cid][q.pid][q.id] = q;
            });
          }
        }
        QuestionStore.emitChange();
      });
      break;
    default:
  }

});

module.exports = QuestionStore;