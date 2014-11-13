"use strict";
var React = require("react/addons");
var {Link} = require("react-router");

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
      <Link to="/"><div className="nav_list_logo l_inline">市長給問嗎 x 最後一役</div></Link>
      <div className="nav_list_function">
        <div className="nav_list_function_item l_inline">
          <div className="nav_list_function_item_select"><i className="fa fa-cog"></i> 候選人</div>
        </div>
        <div className="nav_list_function_item l_inline">
          <div className="nav_list_function_item_select"><i className="fa fa-user"></i> 登入</div>
        </div>
      </div>
    </header>;
  }

});