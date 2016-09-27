import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ReactMarkdown from 'react-markdown';

export default class OrderTag extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.caption === nextProps.caption && this.props.color === nextProps.color) return false;
        return true;
    }

    render() {
        const {name, groupName, caption, color, labelColor, onClick = () => { } } = this.props;
        return (
            <RaisedButton
                style={{ 'height': '50px' }}
                className='orderTagButton'
                backgroundColor={color}
                onClick={onClick.bind(null, groupName, name) }>
                <span style={{ color: labelColor, padding: 4 }}
                    className='orderTagButtonContent'>
                    <ReactMarkdown source={caption}/>
                </span>
            </RaisedButton>
        );
    }
}