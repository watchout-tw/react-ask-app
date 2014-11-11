"use strict";
var React = require("react/addons");
var Question = require("./Question");

module.exports = React.createClass({
  displayName: "QuestionList",

  getInitialState () {
    return {
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {items} = props;
    var result = items.map((item) => {
      return <Question />;
    });
    return <div>
      <div className='pa_totalq'>{'共有 37 題'}</div>
      {result}
    </div>;
  }
});