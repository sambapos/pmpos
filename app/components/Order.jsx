import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

const styles = {
    root: {
        display: 'flex',
        alignContent: 'stretch'
    }
};

export default class Order extends React.Component {
    render() {
        const {id, name, quantity, price, onClick = () => { } } = this.props;
        return (
            <div key={id} className="order">
                <span className="orderQuantity">{quantity}</span>
                <span className="orderName">{name}</span>
                <span className="orderPrice">{price}</span>
            </div>
        );
    }
} 