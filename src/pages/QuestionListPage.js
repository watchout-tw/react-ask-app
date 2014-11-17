/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var CandidateStore = require("../stores/CandidateStore");
var QuestionStore = require("../stores/QuestionStore");
var QuestionActionCreators = require("../actions/QuestionActionCreators");
var PolicyStore = require("../stores/PolicyStore");
var { QuestionList } = require("../components");

module.exports = React.createClass({
  displayName: "QuestionListPage",

  getInitialState () {
    var {candidateId} = this.props.params;
    QuestionActionCreators.getQuestions({
        cid: candidateId
      });
    return {
      policy: {},
      candidate: CandidateStore.get(candidateId),
      questions: [],
      loggedIn: this.props.loggedIn,
      status: CandidateStore.getStatus(),
      hideMore: false
    };
  },

  componentDidMount () {
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount () {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render () {
    return this._render(this.props, this.state);
  },

  _onChange () {
    var {candidateId} = this.props.params;
    var questions = QuestionStore.getQuestionsFrom(candidateId);
    this.setState({
      questions: questions
    })
  },

  _handleMore () {

  },

  _render (props, state) {
    var {candidateId} = props.params;

    return <div id='content'>
      <div className='wrapper'>
        <QuestionList items={state.questions}
                      loggedIn={props.loggedIn}
                      policy={state.policy}
                      candidate={state.candidate}
                      status={state.status[candidateId]}
                      selected={props.query.qid}
                      _handleMore={this._handleMore}
                      hideMore={state.hideMore}/>
      </div>
    </div>;
  }
});
