import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from 'react-toolbox/lib/button';

export default class OrderTag extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.caption === nextProps.caption && this.props.color === nextProps.color) return false;
        return true;
    }

    render() {
        const {name, groupName, caption, color, labelColor, onClick = () => { } } = this.props;
            const style = {
                'flex': '1 1 15%',
                'margin': '4px',
                'height': 'auto',
                'minHeight': '50px',
                'maxHeight': '50%',
                'lineHeight': '2rem',
                'wordWrap': 'breakWord',
                'whiteSpace': 'normal',
                'textTransform': 'none',
                'color': labelColor,
                'backgroundColor': color
        };
        return (
            <Button raised
                style={style}
                className='orderTagButton'
                onClick={onClick.bind(null, groupName, name) }>
                    <ReactMarkdown source={caption} />
            </Button>
        );
    }
}