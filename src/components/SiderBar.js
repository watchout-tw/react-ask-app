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

  _onChange () {
    var cid = CandidateStore.getCurrentCandidate();
    console.log(cid);
    this.setState({
      policies: PolicyStore.getAllFrom(cid)
    });
  },
  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var cid = CandidateStore.getCurrentCandidate();
    var policies = PolicyStore.getAllFrom(cid);
    // this.setState({ policies });
    var result = policies.map((p) => {
      var {id, title} = p;
      return <Link className='nav_item_sidebar' to="policy" params={{candidateId: cid, policyId: id}}>{title}</Link>;
    });
    var toggleClass = (props.hideSiderBar)? '': 'show';
    return <div id='sidebar-container' className={toggleClass} >
      {result}
    </div>;
  }
});