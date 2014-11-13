"use strict";
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var {EventEmitter} = require('events');
var assign = require('object-assign');

var {ActionTypes} = AppConstants;
var CHANGE_EVENT = 'change';
var _candidates = {
  '5': {
    id: 5,
    name: '馮光遠',
    avatar: 'assets/images/candidates/5.jpg'
  },
  '6': {
    id: 6,
    name: '連勝文',
    avatar: 'assets/images/candidates/6.jpg'
  },
  '7': {
    id: 7,
    name: '柯文哲',
    avatar: 'assets/images/candidates/7.jpg'
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

  get (id) {
    return _candidates[id];
  },

  getAll () {
    return _candidates;
  }
});

CandidateStore.dispatchToken = AppDispatcher.register((payload) => {
  var {action} = payload;
  switch(action.type) {
    default:
  }

});

module.exports = CandidateStore;