/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {Link, CurrentPath} = require("react-router");
var UserStore = require("../stores/UserStore");
var CandidateStore = require("../stores/CandidateStore");
var WebAPIUtils = require("../utils/WebAPIUtils");
var UserActionCreators = require("../actions/UserActionCreators");

module.exports = React.createClass({
  displayName: "Navigation",

  mixins: [CurrentPath],

  getInitialState () {
    return {
      loggedIn: this.props.loggedIn,
      hideLogout: true,
      hideCandidate: true,
      checked: false
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

  _handleCheck () {
    this.setState({
      checked: !this.state.checked
    });
  },

  _render (props, state) {
    var user = (state.loggedIn)? <img className='user_profile_image' src={props.user.avatar} /> : '登入';
    var toggleClass = (state.hideLogout)? 'nav_list_function_item_hide' : '';
    var toggleCandidateClass = (state.hideCandidate)? 'nav_list_function_item_hide': '';
    var userMenu = (state.loggedIn)? (
      <div className={ 'nav_list_function_item_tooltip ' + toggleClass} onClick={this._handleLogout}>
        <div className="tri-up"></div>登出
      </div>): '';

    var candidates =  CandidateStore.getAll();
    var candidateMenu = (state.hideCandidate)? '': candidates.map((c) => {
      return <Link to="policies" params={{ candidateId: c.id }} key={c.id} onClick={this._handleCandidate}>
        <div className={'nav_list_function_item_inner md-whiteframe-z1 ' + toggleCandidateClass } >
          <img src={c.avatar_square} />
          <div className="nav_list_function_item_text">{c.name}</div>
        </div>
      </Link>;
    });

    var candidateName = '候選人';
    var cid;
    if (this.getCurrentPath().match(/^\/candidates/)) {
      cid = this.getCurrentPath().match(/^\/candidates\/(\d+)/)[1];
      candidateName = (CandidateStore.get(cid)).name;
    }

    var slider = (<div id="toggleCtrl" onClick={this._handleCheck}>
          <div className="slider_wrap" >
            <input type="checkbox" id="s1" checked={state.checked} />
            <label className="slider" for="s1"></label>
          </div>
        </div>);
    var search = (<div className="nav_search">
        <div className="nav_search_inner">
         <input className="fs" ng-model="query" /><i className="fa fa-search"></i>
        </div>
      </div>);

    return <header className='md-whiteframe-z1'>
      <div className='nav_list_toggle l_inline' onClick={props._toggleSiderBar}>
        <i className="fa fa-align-justify"></i>
      </div>
      <Link to='/'><div className="nav_list_home">市長給問嗎！最後一役</div></Link>
      <div className="nav_list_function">
        <div className="nav_list_function_item l_inline" id="candidateTopMenu">
            <div className="nav_list_function_item_select" onClick={this._handleCandidate}><i className="fa fa-eye"></i> {candidateName}</div>
            <div className={"tri-up " + toggleCandidateClass}></div>
            {candidateMenu}
        </div>
        <div className="nav_list_function_item_user l_inline" onClick={this._handleAuth} id="userMenu">
            <div className="nav_list_function_item_select">
              <i className="fa fa-facebook"></i> {user}
            </div>
            {userMenu}
        </div>
      </div>
    </header>;
  }

});