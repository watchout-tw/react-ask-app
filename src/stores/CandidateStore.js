"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var {EventEmitter} = require('events');
var assign = require('object-assign');
var WebAPIUtils = require("../utils/WebAPIUtils");

var {ActionTypes} = AppConstants;
var CHANGE_EVENT = 'change';
var _current = null;
var _candidates = {
  "1": {
    id: 1,
    name: '李登輝',
    avatar: '/assets/images/candidates/1.jpg', //require("../../client/images/candidates/5.jpg")
    avatar_square: '/assets/images/candidates_avatar/1.jpg',
    status: true
  }
};

var CandidateStore = assign({}, EventEmitter.prototype, {

  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getStatus () {
    var result = {};
    Object.keys(_candidates).map(function (c) {
      return result[c] = _candidates[c].status;
    });
    return result;
  },

  getCurrentCandidate () {
    return _current;
  },

  get (id) {
    return _candidates[id];
  },

  getAll () {
    return Object.keys(_candidates).map((c) => {
      return _candidates[c];
    });
  }
});

CandidateStore.dispatchToken = AppDispatcher.register((payload) => {
  var {action} = payload;
  switch(action.type) {
    case ActionTypes.CHOOSE_CANDIDATE:
      _current=action.id;
      CandidateStore.emitChange();
      break;
    case ActionTypes.STATUS:
      WebAPIUtils.checkStatus(function (err, res) {
        if (err) {
          return console.log(err);
        }
        Object.keys(_candidates).map(function(c, i){
          var allStatus = res.body.data;
          if(allStatus)//this is a workaround
             _candidates[c]['status'] = allStatus[i];
        });
        CandidateStore.emitChange();
      });
      break;
    default:
  }

});

module.exports = CandidateStore;