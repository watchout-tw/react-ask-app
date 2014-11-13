"use strict";
var React = require("react/addons");
var Router = require("react-router");
var {Route, Routes} = Router;
var {Navigation, SiderBar} = require("./components");
var CandidateStore = require("./stores/CandidateStore");

module.exports = React.createClass({
  displayName: "App",

  getInitialState () {
    return {
      hideSiderBar: true
    };
  },

  _toggleSiderBar () {
    this.setState({
      hideSiderBar: !this.state.hideSiderBar
    });
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {hideSiderBar} = state;
    return <div>
      <SiderBar hideSiderBar={hideSiderBar} />
      <Navigation _toggleSiderBar={this._toggleSiderBar} />
      <props.activeRouteHandler />
    </div>;
  }
});
