import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Button } from 'react-toolbox/lib/button';

export default class Portion extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isSelected === nextProps.isSelected) return false;
        return true;
    }

    render() {
        const {name, price, isSelected, onClick = () => { } } = this.props;
        const style = {
            'flex': '1 1 10%',
            'margin': '4px',
            'height': 'auto',
            'minHeight': '50px',
            'maxHeight': '50%',
            'lineHeight': '1.3',
            'wordWrap': 'breakWord',
            'whiteSpace': 'normal',
            'textTransform': 'none',
            'color': isSelected ? 'White' : 'Black',
            'display': 'inline-block',
            'backgroundColor': isSelected ? 'Red' : 'WhiteSmoke'
        };
        return (
            <Button raised
                style={style}
                className="portionButton"
                onClick={onClick.bind(null, name)}>
                <div>
                    <span>{name}</span><br />
                    <span>{price.toFixed(2)}</span>
                </div>
            </Button>
        );
    }
}