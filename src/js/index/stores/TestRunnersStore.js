var _ = require('lodash');
var Reflux = require('reflux');

var Actions = require('../actions/actions.js');
var TestsStore = require('../stores/TestsStore.js');


module.exports = Reflux.createStore({
    init() {
        this.testRunners = {};
        TestsStore.listen(this.onTestsStoreUpdate);
        Actions.testStart.listen((testDescription) => {
            this.testRunners[testDescription].state = 'Running';
            this.testRunners[testDescription].function((passed) => {
                if (passed) {
                    this.testRunners[testDescription].state = 'Passed';
                } else {
                    this.testRunners[testDescription].state = 'Failed';
                }
                this.emitChange();
            });
            this.emitChange();
        })
    },
    onTestsStoreUpdate(tests) {
        this.testRunners = _(tests)
            .map(function(test) {
                return [description, {
                    description: test.description,
                    function: test.run,
                    state: 'Not Started Yet' // Not Started Yet, Running, Passed, or Failed
                }];
            })
            .object();
        this.emitChange();
    }
    emitChange() {
        this.trigger({
            tests: this.testRunners
        });
    },
});
