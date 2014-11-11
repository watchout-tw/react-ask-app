"use strict";
var React = require("react/addons");

module.exports = React.createClass({
  displayName: "Button",

  getInitialState () {
    return {
      hideContent: true
    };
  },

  _handleClick () {
    this.setState({
      hideContent: !this.state.hideContent
    });
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {

    var {name, icon, className} = props;
    var iconClass = 'fa ' + icon;
    var buttonClass = 'button ' + className;
    return <a className={buttonClass} ><i className={iconClass}></i>{' ' + name}</a>

  }
});
