var _ = require('lodash');
var Reflux = require('reflux');

var Actions = require('../actions/actions.js');

module.exports = Reflux.createStore({
    init() {
        this.tests = {};
        this.isLoading = true;
        Actions.addTests.listen(this.onAddTests);
    },
    onAddTests(tests) {
        this.tests.concat(tests);
        this.isLoading = false;
        this.emitChange();
    },
    emitChange() {
        this.trigger({
            tests: this.tests,
            isLoading: this.isLoading
        });
    },
});
