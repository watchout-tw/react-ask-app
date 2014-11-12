/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var { PolicyList, Navigation, Policy, QuestionList, QuestionComposer } = require("./components");

module.exports = React.createClass({
  displayName: "App",

  getInitialState () {
    return {
      new_question: {
        title: null,
        content: null
      },
      hideComposer: true
    };
  },

  _toggleComposer () {
    this.setState({
      hideComposer: !this.state.hideComposer
    });
  },

  _handleComposerChange (event) {
    var {target} = event;
    var {new_question} = this.state;
    if ( 'INPUT' === target.tagName) {
      new_question.title = target.value;
    }
    if ( 'TEXTAREA' === target.tagName) {
      new_question.content = target.value;
    }
    this.setState({ new_question });
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var data = [
      {
        index: '連勝文政見#21',
        title: '十二夜不流淚！ 零安樂不撲殺！'
      },
      {
        index: '連勝文政見#32',
        title: '推動「台北安居」＆「創藝飛翔」計畫 讓原民在北市快樂生活'
      }
    ];
    var items = [
       {
        title: '你如何理解年輕人在台北市工作生活的巨大經濟壓力感?',
        content: '台北市淪為富豪炒房天堂, 每個認真的年輕人的經濟地獄,請問您的看法與解決方案',
        signatures: ['facebook:1123','facebook:11221312313'],
        createdAt: 1415774421035,
        author: 'facebook:123123123'
      },
      {
        title: '您是否願意公開所有競選的收入以及支出提供民眾檢視？',
        content: '選舉經費來源以及支出往往後續造成選後的貪腐以及酬庸。您是否願意將選舉相關財務，無論是收入或是支出部分接受民眾公開檢視？',
        signatures: ['facebook:1123','facebook:11221312313'],
        createdAt: 1415774421035,
        author: 'facebook:123123123'
      }
    ];
    // var boundClick = this._handleClick.bind(this);

    var composer = (state.hideComposer)? '' : (<QuestionComposer _handleCloseComposer={this._toggleComposer} _handleComposerChange={this._handleComposerChange} question={state.new_question}/>);
    return <div>
      <Navigation />
      <div id='content'>
        <div className='wrapper' id='policy'>
          <Policy />
          <div className='ask_item' onClick={this._toggleComposer}>
            <i className='fa fa-plus ask_icon'></i>
          </div>
          {composer}
        </div>
        <div className='wrapper'><QuestionList items={items} /></div>
      </div>
    </div>;
  }
});
