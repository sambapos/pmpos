import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ReactMarkdown from 'react-markdown';

export default class MenuItem extends React.Component {
    render() {
        const {menuItem, onClick = () => { } } = this.props;
        const style = {
            'height': '100%',
            'width': '100%'
        };
        const style2 = {
            'color': menuItem.foreground,
            'height': '100%'
        };
        return (
            <div className='menuButton'>
                <RaisedButton 
                    backgroundColor={ menuItem.color ? menuItem.color : ''}
                    onClick={onClick.bind(null, menuItem.productId) }
                    style={style}>
                    <div style={style2}>
                        <ReactMarkdown source={menuItem.name}/>
                    </div>
                </RaisedButton>
            </div>
        );
    }
} 