"use strict";
var React = require("react/addons");
var {Link} = require("react-router");

module.exports = React.createClass({
  displayName: "IndexPage",

  getInitialState () {
    return {
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    return <div id='content'>
      <div className='page_wrapper'>
        <img className="index_cover" src="ui/images/cover.jpg" />
      </div>
      <div className='page_wrapper color_yellow'>
        <div className="wrapper color_yellow">
          <div className="index_title">市長，給問嗎 x 蘋果日報 x 台北市長候選人 x 政策問答大亂鬥！</div>
        </div>
      </div>
      <div className='wrapper'>
        <h3>遊戲規則說明</h3>
      </div>
      <div className="wrapper">
      </div>
      <div className='wrapper l_center'>
        <Link to="policies" params={{candidateId: 5}}>
          <div className='index_c_item md-whiteframe-z1'>
            <img src="ui/images/candidates/5.jpg" />
          </div>
        </Link>
        <div className='index_c_item md-whiteframe-z1'>
          <img src="ui/images/candidates/6.jpg" />
        </div>
        <div className='index_c_item md-whiteframe-z1'>
          <img src="ui/images/candidates/7.jpg" />
        </div>
      </div>
    </div>;
  }
});
