/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var Question = require("./Question");

module.exports = React.createClass({
  displayName: "QuestionList",

  getInitialState () {
    return {
      selectedIndex: -1,
      items: this.props.items
    };
  },

  componentWillReceiveProps (nextProps) {
    this.setState({
      items: nextProps.items
    });
  },

  render () {
    return this._render(this.props, this.state);
  },

  _handleClick (i, event) {
    if (i !== this.state.selectedIndex) {
      this.setState({ selectedIndex: i });
    } else {
      this.setState({ selectedIndex: -1 });
    }
  },

  _handleSort (event) {
    var {items} = this.state;
    switch(event.target.id) {
      case 'sortBySign':
        items.sort(function (a, b) {
          return b.signatures.length - a.signatures.length;
        });
        break;
      case 'sortByTime':
        items.sort(function (a, b) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        });
        break;
      default:
    }
    this.setState({items});
  },

  _render (props, state) {
    var {items} = state;
    var result = items.map((item, index) => {
      var boundClick = this._handleClick.bind(this, index);
      var selected = (index === state.selectedIndex)? true: false;
      return <Question key={item.id}
                       selected={selected}
                       index={index}
                       question={item}
                       _handleClick={boundClick}
                       cid={props.candidate.id}
                       pid={props.policy.id}
                       qid={item.id}
                       loggedIn={props.loggedIn} />;
    });
    return <div >
      <div className="question_menu">
        <div className="question_menu_meta">{'共有 ' + items.length + ' 題'}</div>
        <div className="sorting_menu" >
            <label className="radio" >
               <input id="sortBySign" type="radio" name="radios" checked="" onClick={this._handleSort} />
               <span className="outer"><span className="inner"></span></span>
               <span className="radio_text">票數排序</span>
            </label>
            <label className="radio">
            <input id="sortByTime" type="radio" name="radios" onClick={this._handleSort} />
               <span className="outer"><span className="inner"></span></span>
               <span className="radio_text">時間排序</span>
            </label>
        </div>
      </div>
      {result}
      <div className="question_bottom">
       <a className="button"><i className="fa fa-bullhorn"></i>{ ' 更多'}</a>
      </div>
    </div>;
  }
});