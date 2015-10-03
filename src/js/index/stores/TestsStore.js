var _ = require('lodash');
var Reflux = require('reflux');

var Actions = require('../actions/actions.js');

module.exports = Reflux.createStore({
    init() {
        this.tests = [];
        Actions.addTests.listen(this.onAddTests);
    },
    onAddTests(newTests) {
        this.tests = this.tests.concat(newTests);
        this.emitChange();
    },
    emitChange() {
        this.trigger({
            tests: this.tests
        });
    },
});
