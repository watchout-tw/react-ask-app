/** @jsx React.DOM */
"use strict";
var React = require("react");
var Router = require("react-router");
var {Route, Routes} = Router;
var {Navigation, SiderBar} = require("./components");
var CandidateStore = require("./stores/CandidateStore");
var UserStore = require("./stores/UserStore");
var {Promise} = require("es6-shim");
var WebAPIUtils = require("./utils/WebAPIUtils");

module.exports = React.createClass({
  displayName: "App",

  getInitialState () {
    return {
      hideSiderBar: true,
      loggedIn: false
    };
  },

  componentDidMount () {
    UserStore.addChangeListener(this._onChange);
    setTimeout((function () {
      UserStore.loggedIn( (err, res) =>{
        this.setState({
          loggedIn: !!res.body.authenticated
        });
      }).bind(this);
    }).bind(this) ,1000);
  },

  render () {
    return this._render(this.props, this.state);
  },

  _onChange () {
    UserStore.loggedIn( (err, res) =>{
      this.setState({
        loggedIn: !!res.body.authenticated
      });
    }).bind(this);
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
                  loggedIn={state.loggedIn} />
      <props.activeRouteHandler loggedIn={state.loggedIn} />
    </div>;

    // return <div>
    //   <SiderBar hideSiderBar={hideSiderBar} />
    //   <Navigation _toggleSiderBar={this._toggleSiderBar}
    //               _handleLogin = { this._handleLogin}
    //               loggedIn={state.loggedIn} />
    //   <props.activeRouteHandler loggedIn={state.loggedIn} />
    // </div>;
  }
});
