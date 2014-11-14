/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var {PolicyList} = require("../components");
var PolicyStore = require("../stores/PolicyStore");
var CandidateStore = require("../stores/CandidateStore");
var CandidateActionCreators = require("../actions/CandidateActionCreators");

module.exports = React.createClass({
  displayName: "PolicyListPage",

  getInitialState () {
    var {candidateId} = this.props.params;
    return {
      data: PolicyStore.getAllFrom(candidateId),
      candidate: CandidateStore.get(candidateId)
    };
  },

  componentWillReceiveProps (nextProps) {
    var {candidateId} = nextProps.params;
    this.setState({
      data: PolicyStore.getAllFrom(candidateId),
      candidate: CandidateStore.get(candidateId)
    });
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {data, candidate} = state;
    CandidateActionCreators.chooseCandidate(candidate.id);
    return <div id="content">
      <div className="wrapper">
        <div><h2>{ candidate.name + '的政見'}</h2></div>
        <PolicyList data={data} cid={candidate.id} />
      </div>
    </div>;
  }
});
