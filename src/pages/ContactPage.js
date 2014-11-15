/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var CandidateStore = require("../stores/CandidateStore");
var CandidateActionCreators = require("../actions/CandidateActionCreators");

module.exports = React.createClass({
  displayName: "ContactPage",

  getInitialState () {
    return {
      candidates: CandidateStore.getAll()
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {candidates} = state;
    
    
    return <div id="content">
    <div className="page_wrapper page_section">
    <div className="wrapper">
        <div className="index_content md-whiteframe-z1" id="page_content">
            <div className="index_subsection" >
                <div className="index_maintitle">
                   <h1>聯絡我們</h1>
                </div>
                <p>網站使用詢問、錯誤回報、機制建議，請聯絡：<a className="link" href="mailto:info@watchout.tw">info@watchout.tw</a></p>
                <p>合作建議，請聯絡：<a className="link" href="mailto:zuyi.lin@watchout.tw">zuyi.lin@watchout.tw</a></p>
            </div>
        </div>
    </div>
    </div>
</div>
  }
});
