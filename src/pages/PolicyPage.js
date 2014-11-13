"use strict";
var React = require("react/addons");
var { PolicyList, Navigation, Policy, QuestionList, QuestionComposer } = require("../components");
var QuestionStore = require("../stores/QuestionStore");
var PolicyStore = require("../stores/PolicyStore");
var CandidateActionCreators = require("../actions/CandidateActionCreators");

module.exports = React.createClass({
  displayName: "App",

  getInitialState () {
    var {candidateId, policyId} = this.props.params;
    return {
      new_question: {
        title: null,
        content: null
      },
      policy: PolicyStore.get({
        cid: candidateId,
        index: policyId
      }),
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
    var {policy, questions} = state;
    var items = Object.keys(questions).map( (question)=> { return questions[question]; });

    var composer = (state.hideComposer)? '' : (<QuestionComposer _handleCloseComposer={this._toggleComposer}
                                                                 _handleComposerChange={this._handleComposerChange}
                                                                 _handleDrop={this._handleDrop}
                                                                 question={state.new_question}/>);
    return <div id='content'>
        <div className='wrapper' id='policy'>
          <Policy data={policy} />
          <div className='ask_item' onClick={this._toggleComposer}>
            <i className='fa fa-plus ask_icon'></i>
          </div>
          {composer}
        </div>
        <div className='wrapper'><QuestionList items={[]} /></div>
      </div>;
  }
});
