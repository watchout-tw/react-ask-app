/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var CandidateStore = require("../stores/CandidateStore");
var CandidateActionCreators = require("../actions/CandidateActionCreators");

module.exports = React.createClass({
  displayName: "AnswerPage",

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
        <div className="index_content md-whiteframe-z1">
            <div className="index_subsection">
                <div className="index_maintitle">
                   <h1>阿輝伯對年輕人的 3 個提問</h1>
                </div>
                <p>1. 我是誰？</p>
                <p>2. 領導人應該具有的的特質？台灣需要什麼樣的領導人？</p>
                <p>3. 對國家未來發展的想像是什麼？</p>
                <div className="fb-comments" data-href="http://developers.facebook.com/docs/plugins/comments/" data-numposts="5" data-colorscheme="light"></div>
            </div>
        </div>
    </div>
</div>
</div>;
  }
});
