/** @jsx React.DOM */
"use strict";
var React = require("react");
var Router = require("react-router");
var {Route, Routes, CurrentPath} = Router;
var {Navigation, SiderBar, Footer, Button} = require("./components");
var CandidateStore = require("./stores/CandidateStore");
var UserActionCreators = require("./actions/UserActionCreators");
var CandidateActionCreators = require("./actions/CandidateActionCreators");
var UserStore = require("./stores/UserStore");
var {Promise} = require("es6-shim");
// var WebAPIUtils = require("./utils/WebAPIUtils");

module.exports = React.createClass({
  displayName: "App",

  mixins: [CurrentPath],

  getInitialState () {
    UserActionCreators.checkLogin();
    CandidateActionCreators.checkStatus();
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

  _toggleSiderBar () {
    if (this.getCurrentPath().match(/^\/candidates/)){
      this.setState({
        hideSiderBar: !this.state.hideSiderBar
      });
    }
  },

  _render (props, state) {
    var cid = null;
    if (this.getCurrentPath().match(/^\/candidates/)){
      cid = this.getCurrentPath().match(/^\/candidates\/(\d+)/)[1];
    }

    var {hideSiderBar} = state;
    return <div>
      <SiderBar hideSiderBar={hideSiderBar}
                cid={cid} 
                _toggleSiderBar={this._toggleSiderBar}/>
      <Navigation _toggleSiderBar={this._toggleSiderBar}
                  loggedIn={state.loggedIn}
                  user={state.user} />
      <props.activeRouteHandler loggedIn={state.loggedIn}
                                user={state.user} />
      <Footer />
    </div>;
  }
});
