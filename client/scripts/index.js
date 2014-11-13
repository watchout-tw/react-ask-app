"use strict";
require("../styles/doc.css");
require("../styles/style.css");
require("../styles/font-awesome.min.css");
var React = require("react/addons");
var Router = require("react-router");
var {Route, Routes, DefaultRoute} = Router;

var {App} = require("../../src");
var {IndexPage, PolicyPage, PolicyListPage} = require("../../src/pages");


var routes = (
  <Routes >
    <Route handler={App}>
      <DefaultRoute handler={IndexPage} />
      <Route name="policies" path="/candidate/:candidateId/policies" handler={PolicyListPage} />
      <Route name="policy" path="/candidate/:candidateId/policies/:policyId" handler={PolicyPage} />
    </Route>
  </Routes>
);

React.render(
  routes,
  document.getElementById("react-root")
);
