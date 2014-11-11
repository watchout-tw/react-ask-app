/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var { PolicyList, Navigation, Policy, QuestionList } = require("./components");

module.exports = React.createClass({
  displayName: "App",

  getInitialState () {
    return {
      app: null
    };
  },

  _onMenuIconClick () {

  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var data = [
      {
        index: '連勝文政見#21',
        title: '十二夜不流淚！ 零安樂不撲殺！'
      },
      {
        index: '連勝文政見#32',
        title: '推動「台北安居」＆「創藝飛翔」計畫 讓原民在北市快樂生活'
      }
    ];
    var items = [
       {
        index: '連勝文政見#21',
        title: '十二夜不流淚！ 零安樂不撲殺！'
      },
      {
        index: '連勝文政見#32',
        title: '推動「台北安居」＆「創藝飛翔」計畫 讓原民在北市快樂生活'
      }
    ];

    // return <div>
    //     <Navigation />
    //   <div id='content'>
    //     <PolicyList data={data} />
    //   </div>
    // </div>;
    return <div>
      <Navigation />
      <div id='content'>
        <div className='wrapper'><Policy /></div>
        <div className='wrapper'><QuestionList items={items} /></div>
      </div>
    </div>;
  }
});
