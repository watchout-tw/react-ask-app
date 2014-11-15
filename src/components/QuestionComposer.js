/** @jsx React.DOM */
"use strict";
var QuestionActionCreators = require('../actions/QuestionActionCreators');
var UserStore = require("../stores/UserStore");
var React = require('react/addons');
var Button = require('./Button');
// var ENTER_KEY_CODE = 13;

module.exports = React.createClass({
  displayName: "QuestionComposer",

  getInitialState () {
    return {
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _handleCreateQuestion () {
    // validate title and question and click time
    var {question} = this.props;
    var {title, content} = question;
    if (!title || !content) {
      return;
    }
    QuestionActionCreators.createQuestion(question);
    this.props._handleCloseComposer();
  },

  _render (props, state) {

    var {question, policy, candidate} = props;
    var {title, content} = question;
    return <div className='ask_form'>
      <div className='ask_form_title'>
        <i className='fa fa-paper-plane-o'></i>
        { '  ' + candidate.name + '的政策提問：'}
        <div className='ask_form_remove' onClick={props._handleCloseComposer}>
          <i className='fa fa-times'></i>
        </div>
      </div>
      <div className='ask_form_listitem'>
        <span className="ask_form_subtitle">{'提問政策'}</span>
        {'  ' + policy.title }
      </div>
      <div className='ask_form_listitem'>
        <span className="ask_form_subtitle" >{'問題簡述'}</span>
        <input placeholder="請在此輸入簡短清楚的問題簡述" value={title} onChange={props._handleComposerChange} />
      </div>
      <div className='ask_form_content'>
        <textarea placeholder="問題說明：您可以在此進一步說明您的問題" value={content} onChange={props._handleComposerChange} />
      </div>
      <div className="ask_form_functions">
         <Button icon='fa-bullhorn' name=' 送出' _handleClick={this._handleCreateQuestion} />
         <span className="ask_form_trash" onClick={props._handleDrop}><i className='fa fa-trash-o' ></i></span>
      </div>
    </div>;
  }
});
