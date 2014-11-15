var { PayloadSources } = require('../constants/AppConstants');

var {Dispatcher} = require("flux");
var assign = require("object-assign");

var AppDispatcher = assign(new Dispatcher(), {
  handleServerAction (action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction (action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;