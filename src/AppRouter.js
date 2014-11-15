/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var ReactRouter = require("react-router");
var {Routes, Route, DefaultRoute, Redirect} = ReactRouter;
// var App = require("./App");
// var {IndexPage, PolicyPage, PolicyListPage} = require("./pages");
var App = React.createFactory(require("./App"));
var IndexPage = React.createFactory(require("./pages/IndexPage"));
var TermsPage = React.createFactory(require("./pages/TermsPage"));
var PolicyPage = React.createFactory(require("./pages/PolicyPage"));
var PolicyListPage = React.createFactory(require("./pages/PolicyListPage"));

var Auth = React.createClass({
  render () {
    return <h1>Test</h1>;
  }
});

var app_router = <Routes location="history">
    <Route handler={App} >
      <Route name="index" path="/" handler={IndexPage} />
      <Route name="iterms" path="/terms" handler={TermsPage} />
      <Route name="policies" path="/candidates/:candidateId/policies" handler={PolicyListPage} />
      <Route name="policy" path="/candidates/:candidateId/policies/:policyId" handler={PolicyPage} />
      <Redirect path="/auth/facebook/callback" to="/" />
    </Route>
</Routes>;

module.exports = app_router;