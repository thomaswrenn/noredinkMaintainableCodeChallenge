var _ = require('lodash');
var Reflux = require('reflux');

var Actions = require('../actions/actions.js');
var TestsStore = require('../stores/TestsStore.js');


module.exports = Reflux.createStore({
    init() {
        this.testRunners = {};
        TestsStore.listen(this.onTestsStoreUpdate);
        Actions.testStart.listen((testDescription) => {
            this.testRunners
        })
    },
    onTestsStoreUpdate(tests) {
        this.testRunners = _.mapValues(tests, function(test) {
            return {
                description: test.description,
                function: test.run,
                state: 'Not Started Yet' // Not Started Yet, Running, Passed, or Failed
            }
        });
        this.emitChange();
    },
    onTestStart: {

    }
    emitChange() {
        this.trigger({
            tests: this.testRunners
        });
    },
});
