"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var {PolicyList} = require("../components");

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
    var items = [
      {
        index: '馮光遠政見#1',
        title:'馮光遠馮光遠馮光遠馮光遠馮光遠'
      }
    ];
    return <div id="content">
      <div className="wrapper">
        <div><h2>馮光遠的政見</h2></div>
        <PolicyList data={items}/>
      </div>
    </div>;

  }
});
