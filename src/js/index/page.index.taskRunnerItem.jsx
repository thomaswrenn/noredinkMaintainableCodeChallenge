var React = require('react');

var Actions = require('./actions/actions.js');

module.exports = React.createClass({
    render() {
        return (
            <div>
                {this.props.description}
                <button onClick={() => { Actions.testStart(this.props.id) } }>{this.props.state}</button>
            </div>
        );
    }
});
