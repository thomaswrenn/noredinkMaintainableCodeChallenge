var _ = require('lodash');
var React = require('react');

var TaskRunner = require('./page.index.taskRunner.jsx');
var Actions = require('./actions/actions.js');

React.render(
    <TaskRunner/>,
    document.getElementById('main')
);

function generateDummyTest() {
    var delay = 7000 + Math.random() * 7000;
    var testPassed = Math.random() > 0.5;
    return function(callback) {
      setTimeout(function() {
        callback(testPassed);
      }, delay);
    };
}

Actions.addTests([
    { description: "commas are rotated properly",          run: generateDummyTest() },
    { description: "exclamation points stand up straight", run: generateDummyTest() },
    { description: "run-on sentences don't run forever",   run: generateDummyTest() },
    { description: "question marks curl down, not up",     run: generateDummyTest() },
    { description: "semicolons are adequately waterproof", run: generateDummyTest() },
    { description: "capital letters can do yoga",          run: generateDummyTest() }
]);
