var React = require('react');
var tinycolor = require('tinycolor2');

var Button = require('../components/button.jsx');

var Actions = require('./actions/actions.js');

module.exports = React.createClass({
    render() {
        return (
            <div style={{
                width: 'auto',
                borderRadius: 5,
                padding: '5px 2px 5px 8px',
                margin: 5,
                background: tinycolor({h:0, s:0, l: 0.4}).toHexString()
            }}>
                <span style={{
                    fontFamily: 'sans-serif',
                    color: 'white'
                }}>
                    {this.props.description}
                </span>
                <span style={{
                    float: 'right'
                }}>
                    <Button className={this.props.state.className} style={this.props.state.style} onClick={() => { Actions.testStart(this.props.id) } }>
                        {this.props.state.display}
                    </Button>
                </span>
            </div>
        );
    }
});
