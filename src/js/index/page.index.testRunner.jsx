var React = require('react');
var _ = require('lodash');

var TestRunnerItem = require('./page.index.testRunnerItem.jsx');

var Actions = require('./actions/actions.js');
var TestRunnersStore = require('./stores/TestRunnersStore.js');

module.exports = React.createClass({
    getInitialState() {
        return {
            tests: TestRunnersStore.tests
        }
    },
    componentDidMount() {
        this.unsubscribes = [
            TestRunnersStore.listen(this.handleStoreChange)
        ];
    },
    componentWillUnmount() {
        _.each(this.unsubscribes, (unsubscribe) => { unsubscribe(); });
    },
    handleStoreChange() {
        this.setState({
            testRunners: TestRunnersStore.testRunners
        });
    },
    render() {
        return (
            <div>
                {
                    _.map(this.state.testRunners, (testRunner) => {
                        return (<TestRunnerItem {...testRunner} />);
                    })
                }
            </div>
        );
    }
});
