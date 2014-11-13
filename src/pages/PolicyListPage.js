"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var {PolicyList} = require("../components");
var PolicyStore = require("../stores/PolicyStore");
var CandidateStore = require("../stores/CandidateStore");

module.exports = React.createClass({
  displayName: "IndexPage",

  getInitialState () {
    var {candidateId} = this.props.params;
    return {
      data: PolicyStore.getAllFrom(candidateId),
      candidate: CandidateStore.get(candidateId)
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {data, candidate} = state;
    return <div id="content">
      <div className="wrapper">
        <div><h2>{ candidate.name + '的政見'}</h2></div>
        <PolicyList data={data} cid={candidate.id} />
      </div>
    </div>;

  }
});
