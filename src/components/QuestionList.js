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

  _handleClick (i, event) {
    if (i !== this.state.selectedIndex) {
      this.setState({ selectedIndex: i });
    } else {
      this.setState({ selectedIndex: -1 });
    }
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {items} = props;
    var result = items.map((item, index) => {
      var boundClick = this._handleClick.bind(this, index);
      var selected = (index === state.selectedIndex)? true: false;
      return <Question key={item.id}
                       selected={selected}
                       index={index}
                       qid={item.id}
                       _handleClick={boundClick} />;
    });
    return <div >
      <div className='pa_totalq'>{'共有 ' + items.length + ' 題'} </div>
      {result}

    </div>;
  }
});