var _ = require('lodash');
var Reflux = require('reflux');

var Actions = require('../actions/actions.js');
var TestsStore = require('../stores/TestsStore.js');

module.exports = Reflux.createStore({
    init() {
        this.testRunners = {};
        TestsStore.listen(this.onTestsStoreUpdate);
        Actions.testStart.listen((testId) => {
            console.log(testId);
            if (this.testRunners[testId]) {
                this.testRunners[testId].state = 'Running';
                this.testRunners[testId].func((passed) => {
                    if (passed) {
                        this.testRunners[testId].state = 'Passed';
                    } else {
                        this.testRunners[testId].state = 'Failed';
                    }
                    this.emitChange();
                });
                this.emitChange();
            }
        })
    },
    onTestsStoreUpdate(testsStoreState) {
        this.testRunners = _.assign(
            this.testRunners,
            _(testsStoreState.tests)
                .map((test, key) => {
                    return [key, {
                        id: key,
                        description: test.description,
                        func: test.run,
                        state: 'Not Started Yet' // Not Started Yet, Running, Passed, or Failed
                    }];
                })
                .object()
                .value()
        );
        console.log('this.testRunners', this.testRunners);
        this.emitChange();
    },
    emitChange() {
        this.trigger({
            tests: this.testRunners
        });
    },
});
