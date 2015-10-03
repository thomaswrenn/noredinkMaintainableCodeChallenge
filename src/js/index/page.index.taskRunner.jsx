var React = require('react');
var _ = require('lodash');

var TestsStore = require('./stores/TestsStore.js');

module.exports = React.createClass({
    getInitialState() {
        return {
            tests: TestsStore.tests,
            isLoading: TestsStore.isLoading
        }
    },
    componentDidMount() {
        this.unsubscribes = [
            TestsStore.listen(this.handleStoreChange)
        ];
        console.log('TestsStore, componentDidMount:', TestsStore);
    },
    componentWillUnmount() {
        console.log('componentWillUnmount');
        _.each(this.unsubscribes, (unsubscribe) => { unsubscribe(); });
    },
    handleStoreChange() {
        console.log('TestsStore, handleStoreChange:', TestsStore);
        this.setState({
            tests: TestsStore.tests,
            isLoading: TestsStore.isLoading
        });
    },
    render() {
        return (
            <div>
                {
                    _.map(this.state.tests, (test) => {
                        return (<div>{test}</div>);
                    })
                }
            </div>
        );
    }
});
