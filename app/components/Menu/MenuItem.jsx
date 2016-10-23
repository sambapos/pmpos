import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ReactMarkdown from 'react-markdown';
import { Button } from 'react-toolbox/lib/button';

export default class MenuItem extends React.Component {
    render() {
        const {menuItem, onClick = () => { } } = this.props;
        const style = {
            'flex': '1 1 31.4%',
            'margin': '4px',
            'height': 'auto',
            'minHeight': '65px',
            'maxHeight': '50%',
            'lineHeight': '1.3',
            'wordWrap': 'breakWord',
            'whiteSpace': 'normal',
            'textTransform': 'none',
            'color': menuItem.foreground,
            'backgroundColor': menuItem.color
        };
        return (
            <Button style={style}
                raised onClick={onClick.bind(null, menuItem.productId, menuItem.defaultOrderTags)}>
                <ReactMarkdown className="buttonContent" source={menuItem.caption} />
            </Button>
        );
    }
} 