/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var PolicyBox = require("./PolicyBox");
var {Link} = require("react-router");

module.exports = React.createClass({
  displayName: "PolicyList",

  getInitialState () {
    return {
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var { data, cid } = props;
    var result = data.map( (p,i ) => {
      var {id} = p;
      return <Link key={id} to="policy" params={{candidateId: cid, policyId: id}} className='policy' >
        <PolicyBox item={p} />
      </Link>;
    });
    return <span>{result}</span>;
  }

});
