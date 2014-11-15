/** @jsx React.DOM */
"use strict";
var React = require("react");
var Router = require("react-router");
var {Route, Routes} = Router;
var {Navigation, SiderBar} = require("./components");
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
      loggedIn: false
    };
  },

  componentDidMount () {
    UserStore.addChangeListener(this._onChange);
    setTimeout((function () {
      this.setState({
        loggedIn: UserStore.loggedIn()
      });
    }).bind(this) ,1000);
  },

  render () {
    return this._render(this.props, this.state);
  },

  _onChange () {
    this.setState({
      loggedIn: UserStore.loggedIn()
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
                  loggedIn={state.loggedIn} />
      <props.activeRouteHandler loggedIn={state.loggedIn} />
      
      <div id="footer">
          <div className="footer_link">
          <ul>
              <li className="footer_text"><a href="terms">使用條款</a></li>
              <li className="footer_text"><a href="qa">發問指南</a></li>
              <li className="footer_text"><a href="contact">聯絡我們</a></li>
          </ul>
          </div>
          <div className="footer_logo">
          <ul>
              <li className="footer_img"><a href="http://goo.gl/2vlnVR" target="_new"><img id="footer_apple" src="/assets/images/apple_logo.png" /></a></li>
              <li className="footer_img"><a href="http://goo.gl/du71aO" target="_new"><img id="footer_watchout" src="/assets/images/watchout_logo_black.png" /></a></li>
              <li className="footer_img"><a href="http://goo.gl/LB3KC9" target="_new"><img src="/assets/images/google_logo_color.png" /></a></li>
          </ul>
          </div>
      </div>
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
