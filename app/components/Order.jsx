import React from 'react';

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