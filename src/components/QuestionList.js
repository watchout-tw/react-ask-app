/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var Question = require("./Question");

function sortBySign (a, b) {
  if (b.signatures.length === a.signatures.length) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }
  return b.signatures.length - a.signatures.length;
}
module.exports = React.createClass({
  displayName: "QuestionList",

  getInitialState () {
    return {
      selectedIndex: -1,
      items: this.props.items,
      sortBy: 'sign'
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
    var {items, sortBy} = this.state;
    switch(event.target.id) {
      case 'sortBySign':
        items.sort(sortBySign);
        sortBy = 'sign';
        break;
      case 'sortByTime':
        items.sort(function (a, b) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        });
        sortBy = 'time';
        break;
      default:
    }
    this.setState({items, sortBy});
  },

  _render (props, state) {
    var {items} = state;
    if('sign' === state.sortBy) {
      items = items.sort(sortBySign);
    }
    var result = items.map((item, index) => {
      var boundClick = this._handleClick.bind(this, item.id);
      var selected = (item.id === state.selectedIndex)? true: false;
      if(props.selected === item.id && -1 === state.selectedIndex) {
        selected = true;
      }
      return <Question key={item.id}
                       selected={selected}
                       index={index}
                       question={item}
                       _handleClick={boundClick}
                       cid={props.candidate.id}
                       pid={item.pid}
                       qid={item.id}
                       loggedIn={props.loggedIn}
                       status={props.status} />;
    });
    var sortingMenu = <div className="sorting_menu" >
            <label className="radio" >
               <input id="sortBySign" type="radio" name="radios" defaultChecked={true} onClick={this._handleSort} />
               <span className="outer"><span className="inner"></span></span>
               <span className="radio_text">票數排序</span>
            </label>
            <label className="radio">
            <input id="sortByTime" type="radio" name="radios" onClick={this._handleSort} />
               <span className="outer"><span className="inner"></span></span>
               <span className="radio_text">時間排序</span>
            </label>
        </div>;

    return <div >
      <div className="question_menu">
        <div className="question_menu_meta">{'共有 ' + items.length + ' 題'}</div>
        {sortingMenu}
      </div>
      {result}
    </div>;
  }
});