"use strict";
var React = require("react/addons");

module.exports = React.createClass({
  displayName: "Button",

  getInitialState () {
    return {
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {

    var {name, icon, className} = props;
    var iconClass = 'fa ' + icon;
    var buttonClass = 'button ' + className;
    return <a className={buttonClass} onClick={props._handleClick} ><i className={iconClass}></i>{' ' + name}</a>

  }
});
