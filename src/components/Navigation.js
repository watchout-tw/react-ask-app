"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var UserStore = require("../stores/UserStore");

module.exports = React.createClass({
  displayName: "Navigation",

  getInitialState () {
    return {
      loggedIn: this.props.loggedIn, //UserStore.loggedIn(),
      hideLogout: true
    };
  },

  componentWillMount: function() {
    UserStore.onChange = this._handleStateOnAuth;
    UserStore.login();
  },

  render () {
    return this._render(this.props, this.state);
  },

  _handleStateOnAuth (loggedIn) {
    this.setState({ loggedIn });
  },

  _handleClick () {
    var {loggedIn} = this.state;
    if (loggedIn) {
      this.setState({
        hideLogout: !this.state.hideLogout
      });
      return;
    }
    UserStore.login('joe@example.com', 'password1', (loggedIn) => {
      this.setState({loggedIn});
    });
  },

  _handleLogout () {
    UserStore.logout();
  },

  _render (props, state) {
    var user = (state.loggedIn)? 'username tool ongcanno tshowall': '登入';
    var menuClass = (state.hideLogout)? 'nav_list_function_item_tooltip  nav_list_function_item_hide' : 'nav_list_function_item_tooltip';
    var userMenu = (state.loggedIn)? (
      <div className={menuClass} onClick={this._handleLogout}>
        <div className="tri-up"></div>登出
      </div>): '';

    return <header className='md-whiteframe-z1'>
      <div className='nav_item l_inline' onClick={props._toggleSiderBar}>
        <i className="fa fa-align-justify"></i>
      </div>
      <Link to="/"><div className="nav_list_logo l_inline">市長給問嗎 x 最後一役</div></Link>
      <div className="nav_list_function">
        <div className="nav_list_function_item l_inline">
          <div className="nav_list_function_item_select"><i className="fa fa-cog"></i> 候選人</div>
        </div>
        <div className="nav_list_function_item l_inline" onClick={this._handleClick}>
          <div className="nav_list_function_item_select">
            <i className="fa fa-user"></i> {user}
          </div>
          {userMenu}
        </div>

      </div>
    </header>;
  }

});