"use strict";
var React = require("react/addons");
var PolicyBox = require('./PolicyBox');

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
    var { data } = props;
    var result = data.map( (p) => {
      console.log(p);
      return <PolicyBox item={p} />;
    });
    console.log(result);
    return <div className='wrapper'>
      {result}
    </div>;
  }

});
