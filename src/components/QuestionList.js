/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var Question = require("./Question");

module.exports = React.createClass({
  displayName: "QuestionList",

  getInitialState () {
    return {
      list: null
    };
  },
  render () {
    return this._render(this.props, this.state);
  },
  _render (props, state) {
    var {questions} = props.questions;
    var result = questions.map((question) => {
      return <Question question={question} />;
    });
    return <div className="question-list">{result}</div>;
  }
});