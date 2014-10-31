/** @jsx React.DOM */
"use strict";
var React = require("react/addons");

module.exports = React.createClass({
  displayName: "CandidateList",

  getInitialState () {
    return {
      list: null
    };
  },
  render () {
    return this._render(this.props, this.state);
  },
  _render (props, state) {
    var {candidates} = props;
    var result = candidates.map((candidate)=> {
      var {candidateImage} = candidate;
      return <li>
        <img src={candidateImage} />
        <a >{"看回答"}</a>
      </li>;
    });
    return <ul className="candidates">{result}</ul>;
  }
});
