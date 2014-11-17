/** @jsx React.DOM */
"use strict";
var React = require("react");
var Router = require("react-router");
var {Route, Routes, CurrentPath} = Router;
var {Navigation, SiderBar, Footer, Button, Notification} = require("./components");
var CandidateStore = require("./stores/CandidateStore");
var NotificationStore = require("./stores/NotificationStore");
var UserActionCreators = require("./actions/UserActionCreators");
var CandidateActionCreators = require("./actions/CandidateActionCreators");
var UserStore = require("./stores/UserStore");

module.exports = React.createClass({
  displayName: "App",

  mixins: [CurrentPath],

  getInitialState () {
    UserActionCreators.checkLogin();
    CandidateActionCreators.checkStatus();
    return {
      hideSiderBar: true,
      loggedIn: false,
      user: {},
      hideNotification: true,
      message: NotificationStore.getMessage()
    };
  },

  componentDidMount () {
    UserStore.addChangeListener(this._onChange);
    NotificationStore.addChangeListener(this._onNotify);
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

  _onNotify () {
    this.setState({
      hideNotification: !this.state.hideNotification,
      message: NotificationStore.getMessage()
    });
    setTimeout((function () {
      this.setState({
        hideNotification: !this.state.hideNotification
      });
    }).bind(this), 2000);
  },

  _render (props, state) {
    var cid = null;
    if (this.getCurrentPath().match(/^\/candidates/)){
      cid = this.getCurrentPath().match(/^\/candidates\/(\d+)/)[1];
    }

    var {hideSiderBar} = state;
    return <div>
      <Notification hideNotification={state.hideNotification}
                    message={state.message} />
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
