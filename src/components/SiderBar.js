/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var PolicyStore = require("../stores/PolicyStore");
var CandidateStore = require("../stores/CandidateStore");
var {Link} = require("react-router");

module.exports = React.createClass({
  displayName: "SideBar",

  getInitialState () {

    return {
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var cid = props.cid;
    var policies = PolicyStore.getAllFrom(cid);
    var result = policies.map((p) => {
      var {id, title, indexTitle} = p;
      return <Link key={id}
                   className='nav_item_sidebar'
                   to="policy"
                   params={{candidateId: cid, policyId: id}}>
       {indexTitle} {title}
      </Link>;
    });
    var toggleClass = (props.hideSiderBar)? '': 'show';
    return <div id='sidebar-container' className={toggleClass} >
      {result}
    </div>;
  }
});