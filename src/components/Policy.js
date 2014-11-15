/** @jsx React.DOM */
"use strict";
var React = require("react/addons");

module.exports = React.createClass({
  displayName: "Policy",

  getInitialState () {
    return {
      hideContent: true
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _handleClick () {
    this.setState({
      hideContent: !this.state.hideContent
    });
  },

  // TODO: do this on the server
  _handlePreview (html) {
    return String(html).replace(/<[^>]+>/gm, '').replace(/&nbsp;/gi,' ').substring(0,200) + '...';
  },

  _render (props, state) {
    var {indexTitle, title, content} = props.data;
    var preview= this._handlePreview(content);
    var contentClass = (state.hideContent)? 'p_fullcontent_hide': '';
    var toggleIcon = (state.hideContent)? 'fa fa-angle-double-down': 'fa fa-angle-double-up';
    var togglePreview = (state.hideContent)? (<div className='p_preview'>
        {preview}
        <span className='p_seeall' onClick={this._handleClick}>{'（繼續閱讀）'}</span>
      </div>) : '';
    var toggle = (state.hideContent)? '' : (<div className="l_center">
        <span className="p_seeall" onClick={this._handleClick}><i className="fa fa-angle-double-up"></i> 摺疊</span>
      </div>);

    return <div className='md-whiteframe-z1 p_item'>
      <div className='p_title' onClick={this._handleClick}>
        {indexTitle} {title}
        <div className='p_actionicon l_inline'>
          {'　'}<i className={toggleIcon}></i>
        </div>
      </div>
      {togglePreview}
      <div className={contentClass} dangerouslySetInnerHTML={{__html: content}} onDoubleClick={this._handleClick}/>
      {toggle}
    </div>;

  }

});
