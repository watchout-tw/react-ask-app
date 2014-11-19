/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var QuestionActionCreators = require('../actions/QuestionActionCreators');
var AppActionCreators = require('../actions/AppActionCreators');
var UserStore = require("../stores/UserStore");
var Button = require('./Button');

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
    // console.log(question);
    QuestionActionCreators.createQuestion(question);
    this.props._handleCloseComposer();
  },

  _render (props, state) {

    var {question, policy, candidate, minimizeComposer} = props;
    var {title, content} = question;

    var minimizeComposerClass = (minimizeComposer)? 'ask_form_minimize' : '';
    var tips = '您可以在此進一步說明您的問題。\n\n發問小提醒：\n1. 提問送出後無法修改或刪除。\n2. 切換頁面時，系統會自動刪除尚未送出的問題。\n3. 提問會顯示您的臉書使用者名稱及照片。';

    return <div className={ 'ask_form ' + minimizeComposerClass}>
      <div className='ask_form_title' onClick={props._handleMinimizeComposer}>
        <i className='fa fa-paper-plane-o'></i>
        { '  對' + candidate.name + '先生提問：'}
        <div className='ask_form_remove'>
          <i className='fa fa-minus'></i>
        </div>
      </div>
      <div className='ask_form_listitem'>
        <span className="ask_form_subtitle">{'提問主題'}</span>
        {'  ' + policy.title }
      </div>
      <div className='ask_form_listitem'>
        <span className="ask_form_subtitle" >{'問題簡述'}</span>
        <input placeholder="請在此輸入簡短清楚的問題簡述" value={title} onChange={props._handleComposerChange} />
      </div>
      <div className='ask_form_content'>
        <span className="ask_form_subtitle_composearea" >{'問題說明'}</span>
        <textarea placeholder={tips} value={content} onChange={props._handleComposerChange} />
      </div>
      <div className="ask_form_functions">
         <Button icon='fa-bullhorn' name=' 送出' _handleClick={this._handleCreateQuestion} />
         <span className="ask_form_trash" onClick={props._handleDrop}><i className='fa fa-trash-o' ></i></span>
      </div>
    </div>;
  }
});
