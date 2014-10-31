/** @jsx React.DOM */
"use strict";
var React = require("react/addons");

module.exports = React.createClass({
  displayName: "QuestionMenu",

  getInitialState () {
    return {
      expand: false
    };
  },

  handle_menu_toggle () {
    this.setState({
      expand: !this.state.expand
    });
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    return state.expand?
      (<div className={"menu"} onMouseLeave={this.handle_menu_toggle}><button>連署</button><button>分享</button></div>):
      (<div className={"menu"} onClick={this.handle_menu_toggle}> ... </div>)
  }
});