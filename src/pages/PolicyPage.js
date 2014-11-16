/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var RouteNavigation = require("react-router").Navigation;
var { PolicyList, Navigation, Policy, QuestionList, QuestionComposer } = require("../components");
var QuestionStore = require("../stores/QuestionStore");
var PolicyStore = require("../stores/PolicyStore");
var CandidateStore = require("../stores/CandidateStore");
var UserStore = require("../stores/UserStore");
var CandidateActionCreators = require("../actions/CandidateActionCreators");
var QuestionActionCreators = require("../actions/QuestionActionCreators");
var WebAPIUtils = require("../utils/WebAPIUtils");

module.exports = React.createClass({
  displayName: "PolicyPage",

  mixins: [RouteNavigation],

  getInitialState () {
    var {candidateId, policyId} = this.props.params;
    var {policy, next, prev, limit} = PolicyStore.get({
        cid: candidateId,
        index: policyId
      });
    return {
      new_question: {
        title: null,
        content: null,
        cid: candidateId,
        pid: policyId,
        author: this.props.user
      },
      policy: policy,
      next: next,
      prev: prev,
      limit: limit,
      candidate: CandidateStore.get(candidateId),
      questions: QuestionStore.getAllFrom(candidateId, policyId),
      hideComposer: true,
      loggedIn: this.props.loggedIn,
      status: CandidateStore.getStatus()
    };
  },

  componentWillReceiveProps (nextProps) {
    var {candidateId, policyId} = nextProps.params;
    var {policy, next, prev, limit} = PolicyStore.get({
        cid: candidateId,
        index: policyId
      });
    // avoid calling api multiple times
    if (policyId !== this.state.policy.id) {
      QuestionActionCreators.getQuestions({
          cid: candidateId,
          pid: policyId,
      });
    }
    this.setState({
      loggedIn: nextProps.loggedIn,
      policy: policy,
      prev: prev,
      next: next,
      limit: limit,
      hideComposer: true,
      new_question: {
        title: null,
        content: null,
        cid: candidateId,
        pid: policyId,
        author: this.props.user
      }
    });
  },

  componentDidMount () {
    QuestionStore.addChangeListener(this._onChange);
    CandidateStore.addChangeListener(this._onCandidateChange);
    setTimeout( (function () {
      var {candidateId, policyId} = this.props.params;
      var {new_question} = this.state;
      new_question.author = this.props.user;
      new_question.cid = candidateId;
      new_question.pid = policyId;
      this.setState({ new_question });
      QuestionActionCreators.getQuestions({
        cid: candidateId,
        pid: policyId,
      });
    }).bind(this) , 1000);
  },

  componentWillUnmount () {
    QuestionStore.removeChangeListener(this._onChange);
    CandidateStore.removeChangeListener(this._onCandidateChange);
  },

  render () {
    return this._render(this.props, this.state);
  },

  _onChange () {
    var {candidate, policy, new_question} = this.state;
    new_question.title = null;
    new_question.content = null;
    new_question.cid = candidate.id;
    new_question.pid = policy.id;
    this.setState({
      questions: QuestionStore.getAllFrom(candidate.id, policy.id),
      new_question: new_question
    });
  },

  _onCandidateChange () {
    this.setState({
      status: CandidateStore.getStatus()
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
    var {new_question} = this.state;
    new_question.title = null;
    new_question.content = null;
    this.setState({
      hideComposer: !this.state.hideComposer,
      new_question: new_question
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

  _render (props, state) {
    var {candidateId} = this.props.params;
    var { name } = CandidateStore.get(candidateId);
    var {policy, questions} = state;
    var {loggedIn} = props;
    var composer = (state.hideComposer)? '' : (<QuestionComposer _handleCloseComposer={this._toggleComposer}
                                                                 _handleComposerChange={this._handleComposerChange}
                                                                 _handleDrop={this._handleDrop}
                                                                 question={state.new_question}
                                                                 policy={state.policy}
                                                                 candidate={state.candidate} />);

    var ask_item = (state.status[candidateId])? <div className='ask_item' onClick={this._toggleComposer}>
          <i className='fa fa-plus ask_icon'></i>
        </div> : '';
    if(!state.status[candidateId]) {
      composer = '';
    }

    var prevButton = (state.prev > 0)?<Link to="policy" params={{candidateId: candidateId, policyId: state.prev}}>
      <div className="page_button page_left" ><i className="fa fa-chevron-left"></i></div></Link> : '';
    var nextButton = (state.next <= state.limit)? <Link to="policy" params={{candidateId: candidateId, policyId: state.next}}>
      <div className="page_button page_right" ><i className="fa fa-chevron-right"></i></div></Link>: '';
    return <div id='content'><div id='page_content'>
      {prevButton}
      {nextButton}
      <div className='wrapper' id='policy'>
        <div>
          <h2>{ name + '的政見'}</h2>
        </div>
        <Policy data={policy} />
        {ask_item}
        {composer}
      </div>
      <div className='wrapper'>
        <QuestionList items={questions}
                      loggedIn={props.loggedIn}
                      policy={state.policy}
                      candidate={state.candidate}
                      status={state.status[candidateId] } />
      </div>
    </div></div>;
  }
});
