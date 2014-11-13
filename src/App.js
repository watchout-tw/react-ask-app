"use strict";
var React = require("react/addons");
var Router = require("react-router");
var {Route, Routes} = Router;
var {Navigation, SiderBar} = require("./components");
var CandidateStore = require("./stores/CandidateStore");
var UserStore = require("./stores/UserStore");

module.exports = React.createClass({
  displayName: "App",

  getInitialState () {
    return {
      hideSiderBar: true,
      loggedIn: UserStore.loggedIn()
    };
  },

  // componentWillMount: function() {
  //   UserStore.onChange = this._handleStateOnAuth;
  //   UserStore.login();
  // },

  render () {
    return this._render(this.props, this.state);
  },

  // _handleLogin () {
  //   UserStore.login('joe@example.com', 'password1', (loggedIn) => {
  //     console.log('LoggedIn');
  //     this.setState({loggedIn});
  //   });
  // },

  // _handleStateOnAuth (loggedIn) {
  //   this.setState({ loggedIn });
  // },

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
                  _handleLogin = { this._handleLogin}
                  loggedIn={state.loggedIn} />
      <props.activeRouteHandler loggedIn={state.loggedIn} />
    </div>;
  }
});
