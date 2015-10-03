var _ = require('lodash');
var React = require('react');

module.exports = React.createClass({
    render() {
        return (
            <span {...this.props} style={_.assign(this.props.style, {
                fontFamily: 'sans-serif',
                padding: '2px 4px',
                borderRadius: 5
            })} >
                {this.props.children}
            </span>
        );
    }
})
