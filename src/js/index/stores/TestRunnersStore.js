var _ = require('lodash');
var Reflux = require('reflux');
var tinycolor = require('tinycolor2');

var Actions = require('../actions/actions.js');
var TestsStore = require('../stores/TestsStore.js');

var buttonStyle = (baseColor, disabled, dontAnimateIn) => {
    var returnValue = {
        color: baseColor.toHexString(),
        border: '1px solid ' + baseColor.toHexString(),
        animationDuration: 1
    };
    if (!disabled) {
        returnValue.background = baseColor.lighten(40).toHexString();
        returnValue.cursor = 'pointer';
    }
    return returnValue;
}

var possibleTestStates = {
    notYetStarted: {
        display: 'Not Yet Started',
        style: buttonStyle(tinycolor({h: 0, s: 0, l: 0.5}))
    },
    running: {
        display: 'Running',
        style: buttonStyle(tinycolor({h: 60, s: 0.7, l: 0.5}), true),
        className: 'testStart'
    },
    passed: {
        display: 'Passed',
        style: buttonStyle(tinycolor({h: 120, s: 0.7, l: 0.5})),
        className: 'testComplete'
    },
    failed: {
        display: 'Failed',
        style: buttonStyle(tinycolor({h: 0, s: 0.7, l: 0.5})),
        className: 'testComplete'
    }
}

module.exports = Reflux.createStore({
    init() {
        this.testRunners = {};
        TestsStore.listen(this.onTestsStoreUpdate);
        Actions.testStart.listen((testId) => {
            if (this.testRunners[testId] && this.testRunners[testId].state !== possibleTestStates.running) {
                this.testRunners[testId].state = possibleTestStates.running;
                this.testRunners[testId].func((passed) => {
                    if (passed) {
                        this.testRunners[testId].state = possibleTestStates.passed;
                    } else {
                        this.testRunners[testId].state = possibleTestStates.failed;
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
                        state: possibleTestStates.notYetStarted
                    }];
                })
                .object()
                .value()
        );
        this.emitChange();
    },
    emitChange() {
        this.trigger({
            tests: this.testRunners
        });
    },
});
