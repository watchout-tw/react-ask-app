/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {EntityStore} = require("../stores");
var {EntityActions} = require("../actions");

module.exports = React.createClass({
  displayName: 'Entity',

  getInitialState () {
      return EntityStore.getState();
  },

  componentDidMount () {
      EntityStore.addChangeListener(this._onChange);
      this.getEntityDataIfNeeded(this.props);
  },

  componentWillUnmount () {
      EntityStore.removeChangeListener(this._onChange);
  },

  componentWillReceiveProps (nextProps) {
      this.getEntityDataIfNeeded(nextProps);
  },

  getEntityDataIfNeeded (props) {
      var meta = EntityStore.getState().metaData;
      if(props.activeEntity && props.activeEntity !== meta.id) {

          EntityActions.getEntityData(this.props.activeEntity);

      }
  },

  _onChange () {
    this.setState(EntityStore.getState());
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    return null;
  }

})