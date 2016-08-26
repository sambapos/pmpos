import React from 'react';

export default class Order extends React.Component {
    render() {
        const {id, name, quantity, price, priceTag, onClick = () => { } } = this.props;
        return (
            <div key={id} className="order">
                <span className="orderQuantity">{quantity}</span>
                <span className="orderName">{name}</span>
                <span className="orderPrice">
                    <span className="orderPriceTag">{priceTag}</span>
                    <span >{price}</span>
                </span>
            </div>
        );
    }
} 