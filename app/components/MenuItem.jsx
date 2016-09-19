import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ReactMarkdown from 'react-markdown';

export default class MenuItem extends React.Component {
    render() {
        const {menuItem, onClick = () => { } } = this.props;
        const style = {
            'display': 'flex',
            'flex':'1',
            'height':'75px'
        };
        const style2 = {
            'color': menuItem.foreground,
            'flex':'1',
            'position':'absolute',
            'top':'0',
            'left':'0',
            'height':'100%',
            'width':'100%'
        };
        return (
            <div className='menuButton'>
                <RaisedButton
                    backgroundColor={ menuItem.color ? menuItem.color : ''}
                    onClick={onClick.bind(null, menuItem.productId,menuItem.defaultOrderTags) }
                    style={style}>
                    <div style={style2}>
                        <ReactMarkdown source={menuItem.name}/>
                    </div>
                </RaisedButton>
            </div>
        );
    }
} 