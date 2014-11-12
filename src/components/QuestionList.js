"use strict";
var React = require("react/addons");
var Question = require("./Question");

module.exports = React.createClass({
  displayName: "QuestionList",

  getInitialState () {
    return {
      selectedIndex: -1
    };
  },

  _findNode(node, className) {
    while (node.parentNode) {
      node = node.parentNode;
      if(node.className.match(className)) {
        return node;
      }
    }
    return null;
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {items} = props;
    var result = items.map((item, index) => {
      return <Question index={index}
                       question={item} />;
    });
    return <div >
      <div className='pa_totalq'>{'共有 ' + items.length + ' 題'} </div>
      {result}
    </div>;
  }
});