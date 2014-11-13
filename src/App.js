"use strict";
var React = require("react/addons");
var Router = require("react-router");
var {Route, Routes} = Router;
var {Navigation} = require("./components");

module.exports = React.createClass({
  displayName: "App",

  getInitialState () {
    return {
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    return <div>
      <Navigation />
      <props.activeRouteHandler />
    </div>;
  }
});
