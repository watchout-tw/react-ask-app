"use strict";
var React = require("react/addons");
var PolicyBox = require('./PolicyBox');
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
      return <Link to="policy" params={{candidateId: cid, policyId: i}} className='policy' >
        <PolicyBox item={p} />
      </Link>;
    });
    return <span>{result}</span>;
  }

});
