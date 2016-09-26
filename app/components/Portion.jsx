import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class Portion extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isSelected === nextProps.isSelected) return false;
        return true;
    }
    
    render() {
        const {name, price, isSelected, onClick = () => { } } = this.props;
        const style = {
            'color': isSelected ? 'White' : 'Black',
            'display': 'inline-block'
        };
        const style2 = {
            'height': 'auto'
        };
        return (
            <RaisedButton
                style= {style2}
                className="portionButton"
                backgroundColor={isSelected ? 'Red' : 'White'}
                onClick={onClick.bind(null, name) }>
                <div style={{ 'padding': '4px' }}>
                    <span style={style}>{name}</span><br/>
                    <span style={style}>{price.toFixed(2) }</span>
                </div>
            </RaisedButton>
        );
    }
}