var { PayloadSources } = require('../constants/AppConstants');

var {Dispatcher} = require("flux");
var assign = require("object-assign");

var AppDispatcher = assign(new Dispatcher(), {
  handleServerAction () {

  },

  handleViewAction (action) {
    var payload = {
      source: PayloadSources.SOURCE_VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;