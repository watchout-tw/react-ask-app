/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var UserStore = require("../stores/UserStore");
var CandidateStore = require("../stores/CandidateStore");
var WebAPIUtils = require("../utils/WebAPIUtils");
var UserActionCreators = require("../actions/UserActionCreators");

module.exports = React.createClass({
  displayName: "Navigation",

  getInitialState () {
    return {
      loggedIn: this.props.loggedIn, //UserStore.loggedIn(),
      hideLogout: true,
      hideCandidate: true
    };
  },

  componentWillReceiveProps (nextProps) {
    this.setState({
      loggedIn: nextProps.loggedIn
    });
  },

  render () {
    return this._render(this.props, this.state);
  },

  _handleCandidate () {
    this.setState({
      hideCandidate: !this.state.hideCandidate
    });
  },

  _handleAuth () {
    var {loggedIn} = this.state;
    if (loggedIn) {
      this.setState({
        hideLogout: !this.state.hideLogout
      });
      return;
    }
    return WebAPIUtils.login();
  },

  _handleLogout () {
    UserActionCreators.logout();
  },

  _render (props, state) {
    var user = (state.loggedIn)? 'username tool ongcanno tshowall': '登入';
    var toggleClass = (state.hideLogout)? 'nav_list_function_item_hide' : '';
    var toggleCandidateClass = (state.hideCandidate)? 'nav_list_function_item_hide': '';
    var userMenu = (state.loggedIn)? (
      <div className={ 'nav_list_function_item_tooltip ' + toggleClass} onClick={this._handleLogout}>
        <div className="tri-up"></div>登出
      </div>): '';

    var candidates =  CandidateStore.getAll();
    var candidateMenu = candidates.map((c) => {
      return <Link to="policies" params={{ candidateId: c.id }} key={c.id}>
        <div className={'nav_list_function_item_inner md-whiteframe-z1 ' + toggleCandidateClass } >
          <img src={c.avatar_square} />
          <div className="nav_list_function_item_text">{c.name}</div>
        </div>
      </Link>;
    });
    return <header className='md-whiteframe-z1'>
      <div className='nav_list_toggle l_inline' onClick={props._toggleSiderBar}>
        <i className="fa fa-align-justify"></i>
      </div>
      <Link to='/'><div className="nav_list_home">市長給問嗎! 最後一役</div></Link>
      <div className="nav_list_function_item l_inline" id="candidateTopMenu">
          <div className="nav_list_function_item_select" onClick={this._handleCandidate}><i className="fa fa-eye"></i> 候選人</div>
          <div className={"tri-up " + toggleCandidateClass}></div>
          {candidateMenu}
      </div>
      <div className="nav_list_function_item_user l_inline" onClick={this._handleAuth} id="userMenu">
          <div className="nav_list_function_item_select">
            <i className="fa fa-facebook"></i> {user}
          </div>
          {userMenu}
      </div>
      

      <div className="nav_search">
        <div className="nav_search_inner">
         <input className="fs" ng-model="query" /><i className="fa fa-search"></i>
        </div>
      </div>
    </header>;
  }

});