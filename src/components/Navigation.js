"use strict";
var React = require("react/addons");

module.exports = React.createClass({
  displayName: "Navigation",

  getInitialState () {
    return {
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {

    return <header className='md-whiteframe-z1'>
      <div className='nav_item l_inline'>
        <i className="fa fa-align-justify"></i>
      </div>
      <div className='nav_item l_inline'>政策</div>
      <input className='fs' /><i className="fa fa-search"></i>
    </header>;
  }

});