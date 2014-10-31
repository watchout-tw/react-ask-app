/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var { QuestionList } = require("./components");

module.exports = React.createClass({
  displayName: "App",

  getInitialState () {
    return {
      app: null
    };
  },

  _onMenuIconClick () {

  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var { questions } = props;

    return <QuestionList questions={questions} />;
  }
});
