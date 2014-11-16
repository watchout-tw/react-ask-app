"use strict";
require("../styles/doc.css");
require("../styles/style.css");
require("../styles/font-awesome.min.css");
require.context("../images", true, /\.(jpg|png)$/);
require("es5-shim");
require(" html5shiv");

var React = require("react/addons");
var app_router = require("../../src/AppRouter");

React.render(
  app_router,
  document.getElementById('react-root')
);
