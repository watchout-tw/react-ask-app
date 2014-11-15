/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var { PolicyList, Navigation, Policy, QuestionList, QuestionComposer } = require("../components");
var QuestionStore = require("../stores/QuestionStore");
var PolicyStore = require("../stores/PolicyStore");
var CandidateStore = require("../stores/CandidateStore");
var UserStore = require("../stores/UserStore");
var CandidateActionCreators = require("../actions/CandidateActionCreators");
var QuestionActionCreators = require("../actions/QuestionActionCreators");
var WebAPIUtils = require("../utils/WebAPIUtils");

module.exports = React.createClass({
  displayName: "App",

  getInitialState () {
    var {candidateId, policyId} = this.props.params;
    return {
      new_question: {
        title: null,
        content: null,
      },
      policy: PolicyStore.get({
        cid: candidateId,
        index: policyId
      }),
      candidate: CandidateStore.get(candidateId),
      questions: QuestionStore.getAllFrom(candidateId, policyId),
      hideComposer: true,
      loggedIn: this.props.loggedIn
    };
  },

  componentWillReceiveProps (nextProps) {
    this.setState({
      loggedIn: nextProps.loggedIn
    });
  },

  componentDidMount () {
    QuestionStore.addChangeListener(this._onChange);
    setTimeout( (function () {
      var {candidateId, policyId} = this.props.params;
      QuestionActionCreators.getQuestions({
        cid: candidateId,
        pid: policyId
      });
    }).bind(this) , 1000);
  },

  componentWillUnmount () {
    QuestionStore.removeChangeListener(this._onChange);
  },

  _onChange () {
    var {candidate, policy} = this.state;
    this.setState({
      questions: QuestionStore.getAllFrom(candidate.id, policy.id),
      new_question: {
        title: null,
        content: null
      }
    });
  },

  _toggleComposer () {
    if (!this.state.loggedIn) {
      return;
    }
    this.setState({
      hideComposer: !this.state.hideComposer
    });
  },

  _handleDrop () {
    this.setState({
      hideComposer: !this.state.hideComposer,
      new_question: {
        title: null,
        content: null
      }
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
    var {candidateId} = this.props.params;
    CandidateActionCreators.chooseCandidate(candidateId);
    var { name } = CandidateStore.get(candidateId);
    var {policy, questions} = state;
    var {loggedIn} = props;
    var composer = (state.hideComposer)? '' : (<QuestionComposer _handleCloseComposer={this._toggleComposer}
                                                                 _handleComposerChange={this._handleComposerChange}
                                                                 _handleDrop={this._handleDrop}
                                                                 question={state.new_question}
                                                                 policy={state.policy}
                                                                 candidate={state.candidate} />);
    return <div id='content'>
        <div className='wrapper' id='policy'>
          <div>
            <h2>{ name + '的政見'}</h2>
          </div>
          <Policy data={policy} />
          <div className='ask_item' onClick={this._toggleComposer}>
            <i className='fa fa-plus ask_icon'></i>
          </div>
          {composer}
        </div>
        <div className='wrapper'>
          <QuestionList items={questions}
                        loggedIn={props.loggedIn}
                        policy={state.policy}
                        candidate={state.candidate} />
        </div>
      </div>;
  }
});
