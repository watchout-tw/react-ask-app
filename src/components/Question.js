/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var QuestionMenu = require("./QuestionMenu");
var CandidateList = require("./CandidateList");

module.exports = React.createClass({
  displayName: "Question",

  getInitialState () {
    return {
      hideDescription: true
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  handle_title_click () {
    this.setState({
      hideDescription: !this.state.hideDescription
    });
  },

  _render (props, state) {
    var {question} = props;
    var {title, description, count, candidateList} = question;

    return <div className="question">
        <QuestionMenu />
        <div className="title" onClick={this.handle_title_click}>
          <span>還差 {500 - count} </span> | {title}
        </div>
        { state.hideDescription? '' :(
          <div className="description">
            {description}
            <CandidateList candidates={candidateList} />
          </div>) }
      </div>;
  }
});
