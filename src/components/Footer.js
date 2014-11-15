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
          <li className="footer_img"><a href="http://goo.gl/2vlnVR" target="_new"><img id="footer_apple" src="/assets/images/apple_logo.png" /></a></li>
          <li className="footer_img"><a href="http://goo.gl/du71aO" target="_new"><img id="footer_watchout" src="/assets/images/watchout_logo_black.png" /></a></li>
          <li className="footer_img"><a href="http://goo.gl/LB3KC9" target="_new"><img src="/assets/images/google_logo_color.png" /></a></li>
      </ul>
      </div>
    </div>;

  }
});
