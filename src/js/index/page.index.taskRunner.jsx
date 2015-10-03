var React = require('react');
var _ = require('lodash');

var TaskRunnerItem = require('./page.index.taskRunnerItem.jsx');

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
        console.log('TestRunnersStore, componentDidMount:', TestRunnersStore);
    },
    componentWillUnmount() {
        console.log('componentWillUnmount');
        _.each(this.unsubscribes, (unsubscribe) => { unsubscribe(); });
    },
    handleStoreChange() {
        console.log('TestRunnersStore, handleStoreChange:', TestRunnersStore);
        this.setState({
            testRunners: TestRunnersStore.testRunners
        });
    },
    render() {
        return (
            <div>
                {
                    _.map(this.state.testRunners, (testRunner) => {
                        return (<TaskRunnerItem {...testRunner} />);
                    })
                }
            </div>
        );
    }
});
