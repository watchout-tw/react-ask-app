/** @jsx React.DOM */
"use strict";
var React = require("react/addons");

module.exports = React.createClass({
  displayName: "PolicyBox",

  getInitialState () {
    return {
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {indexTitle, title} = props.item;

    return <div className='md-whiteframe-z1 c_item l_inline v_top'>
      <div className='c_indexTitle'>{indexTitle}</div>
      <div className='c_title'>{title}</div>
    </div>;
  }

});