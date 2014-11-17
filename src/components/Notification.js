/** @jsx React.DOM */
"use strict";
var React = require("react/addons");


module.exports = React.createClass({
  displayName: "Notification",

  getInitialState () {
    return {
    };
  },

  componentWillReceiveProps (nextProps) {
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    //notification_hide
    var  hideClass = (props.hideNotification)? 'notification_hide': '';


    return <div className="notification_wrapper ng-scope">
      <div id="notification" className={hideClass} >{props.message}</div>
    </div>;
  }
});