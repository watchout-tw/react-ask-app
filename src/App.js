/** @jsx React.DOM */
"use strict";
var React = require("react");
var Router = require("react-router");
var {Route, Routes} = Router;
var {Navigation, SiderBar, Footer} = require("./components");
var CandidateStore = require("./stores/CandidateStore");
var UserActionCreators = require("./actions/UserActionCreators");
var UserStore = require("./stores/UserStore");
var {Promise} = require("es6-shim");
// var WebAPIUtils = require("./utils/WebAPIUtils");

module.exports = React.createClass({
  displayName: "App",

  getInitialState () {
    UserActionCreators.checkLogin();
    return {
      hideSiderBar: true,
      loggedIn: false,
      user: {}
    };
  },

  componentDidMount () {
    UserStore.addChangeListener(this._onChange);
    setTimeout((function () {
      this.setState({
        loggedIn: UserStore.loggedIn(),
        user: UserStore.get()
      });
    }).bind(this) ,1000);
  },

  render () {
    return this._render(this.props, this.state);
  },

  _onChange () {
    this.setState({
      loggedIn: UserStore.loggedIn(),
      user: UserStore.get()
    });
  },

  // TODO: handle null SiderBar and need to be closed when clicking
  _toggleSiderBar () {
    this.setState({
      hideSiderBar: !this.state.hideSiderBar
    });
  },

  _render (props, state) {
    var {hideSiderBar} = state;
    return <div>
      <SiderBar hideSiderBar={hideSiderBar} />
      <Navigation _toggleSiderBar={this._toggleSiderBar}
                  loggedIn={state.loggedIn}
                  user={state.user} />
      <props.activeRouteHandler loggedIn={state.loggedIn}
                                user={state.user} />
      <Footer />
    </div>;
  }
});
