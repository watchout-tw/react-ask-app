"use strict";
var React = require("react/addons");
var Question = require("./Question");

module.exports = React.createClass({
  displayName: "QuestionList",

  getInitialState () {
    return {
      selectedIndex: -1
    };
  },

  _handleClick (event) {
    var {target} = event;
    var index =  Array.prototype.indexOf.call(target.parentNode.children, target);
    if (this.state.selectedIndex !== index) {
      this.setState({selectedIndex: index});
    } else {
      this.setState({selectedIndex: -1});
    }
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {items} = props;
    var result = items.map((item, index) => {
      var selected = (index === state.selectedIndex)? true: false;
      return <Question selected={selected} />;
    });
    return <div onClick={this._handleClick}>
      {result}
    </div>;
  }
});