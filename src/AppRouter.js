/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var ReactRouter = require("react-router");
var {Routes, Route, DefaultRoute, NotFoundRoute} = ReactRouter;
var App = React.createFactory(require("./App"));
var IndexPage = React.createFactory(require("./pages/IndexPage"));
var TermsPage = React.createFactory(require("./pages/TermsPage"));
var ContactPage = React.createFactory(require("./pages/ContactPage"));
var QAPage = React.createFactory(require("./pages/QAPage"));
var PolicyPage = React.createFactory(require("./pages/PolicyPage"));
var PolicyListPage = React.createFactory(require("./pages/PolicyListPage"));
var QuestionListPage = React.createFactory(require("./pages/QuestionListPage"));


var app_router = <Routes location="history">
    <Route handler={App} >
      <Route name="index" path="/" handler={IndexPage} />
      <Route name="iterms" path="/terms" handler={TermsPage} />
      <Route name="contact" path="/contact" handler={ContactPage} />
      <Route name="qa" path="/qa" handler={QAPage} />
      <Route name="policies" path="/:candidateId/topics" handler={PolicyListPage} />
      <Route name="policy" path="/:candidateId/topics/:policyId" handler={PolicyPage} />
      <Route name="question" path="/:candidateId/questions" handler={QuestionListPage} />
      <NotFoundRoute handler={IndexPage} />
    </Route>
</Routes>;

module.exports = app_router;