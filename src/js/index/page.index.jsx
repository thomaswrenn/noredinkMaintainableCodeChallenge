var _ = require('lodash');
var React = require('react');

var TestRunner = require('./page.index.testRunner.jsx');
var Actions = require('./actions/actions.js');

React.render(
  <TestRunner/>,
  document.getElementById('main')
);

function generateDummyTest() {
  var delay = 7000 + Math.random() * 7000;
  var testValue = Math.random();
  var testPassed = testValue > 0.5;
  return function(callback) {
    setTimeout(function() {
      callback(testPassed);
    }, delay);
  };
}

Actions.addTests([
  { description: "commas are rotated properly",                 run: generateDummyTest() },
  { description: "exclamation points are standing up straight", run: generateDummyTest() },
  { description: "run-on sentences don't run forever",          run: generateDummyTest() },
  { description: "question marks are curling down, not up",     run: generateDummyTest() },
  { description: "semicolons are adequately waterproof",        run: generateDummyTest() },
  { description: "capital letters can do yoga",                 run: generateDummyTest() },
]);
