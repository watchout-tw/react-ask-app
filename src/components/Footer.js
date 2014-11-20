/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {Link} = require("react-router");

module.exports = React.createClass({
  displayName: "Footer",

  getInitialState () {
    return {
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    return <div id="footer">
      <div className="footer_link">
      <ul>
          <li className="footer_text"><Link to="iterms">使用條款</Link></li>
          <li className="footer_text"><Link to="qa">發問指南</Link></li>
          <li className="footer_text"><Link to="contact">聯絡我們</Link></li>
      </ul>
      </div>
      <div className="footer_logo">
      <ul>
          <li className="footer_img"><a href="http://goo.gl/L3SXn4" target="_new"><img id="footer_watchout" src="/assets/images/watchout_logo_black.png" /></a></li>
      </ul>
      </div>
    </div>;

  }
});
