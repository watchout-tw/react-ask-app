/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var { PolicyList, Navigation, Policy, QuestionList, QuestionComposer } = require("./components");
var QuestionStore = require("./stores/QuestionStore");

module.exports = React.createClass({
  displayName: "App",

  getInitialState () {
    return {
      new_question: {
        title: null,
        content: null
      },
      questions: QuestionStore.getAll(),
      hideComposer: true
    };
  },

  componentDidMount () {
    QuestionStore.addChangeListener(this._onChange);
    // console.log(this.state);
  },

  componentWillUnmount () {
    QuestionStore.addChangeListener(this._onChange);
  },

  _onChange () {
    this.setState({
      questions: QuestionStore.getAll(),
      new_question: {
        title: null,
        content: null
      }
    });
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

    var {questions} = state;
    var items = Object.keys(questions).map( (question)=> { return questions[question]; });

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
