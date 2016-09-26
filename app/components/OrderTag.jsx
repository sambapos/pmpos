import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ReactMarkdown from 'react-markdown';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class OrderTag extends React.Component {
    
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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