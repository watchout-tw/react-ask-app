"use strict";
var React = require("react/addons");
var Button = require("./Button");

module.exports = React.createClass({
  displayName: "Question",

  getInitialState () {
    return {
      hideContent: true
    };
  },

  _handleClick () {
    this.setState({
      hideContent: !this.state.hideContent
    });
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {

    // var paragraphs = data.content.map((p)=>{
    //   return <p className='q_text'>{p}</p>
    // });
    var content = (state.hideContent)? '': <div className='q_content'>
        <p className='q_text'>{'你如何理解年輕人在台北市工作生活的巨大經濟壓力感?'}</p>
        <div className='q_postmeta'>{'提問人：someid / 提問時間：02-22 12:00'}</div>
        <div className='q_action'>
          <Button name='連署' icon='fa-bullhorn' />{' '}
          <Button className='facebook' name='分享' icon='fa-facebook' />
        </div>
      </div>;

    var itemClass = (state.hideContent )? 'q_item md-whiteframe-z1' : 'q_item md-whiteframe-z1 q_item_active';
    var titleClass = (state.hideContent )? 'q_title l_inline' : 'q_title l_inline q_title_active';
    var toggleIcon = (state.hideContent)? 'fa fa-angle-double-down': 'fa fa-angle-double-up';
    return <div className={itemClass}>
      <div className={titleClass} onClick={this._handleClick}>
        <div className='q_order l_inline'>{'1'}</div>
        <div className='q_vote l_inline'>{'1,583'}</div>
        {'你如何理解年輕人在台北市工作生活的巨大經濟壓力感?'}
        <div className='q_function l_inline'>
          <span><i className={toggleIcon}></i></span>
        </div>
      </div>
      {content}
    </div>;
  }
});
