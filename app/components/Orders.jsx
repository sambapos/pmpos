import React from 'react';
import Order from './Order';
import ReactDom from 'react-dom';

export default class Orders extends React.Component {
    render() {
        const {ticket, onClick = () => { } } = this.props;
        return (
            <div className="orders" id="orders">
                {ticket.orders.map(({uid, name, quantity, price, priceTag}) =>
                    <Order key={uid} name={name} quantity={quantity}
                        price={price.toFixed(2)} priceTag={priceTag} onClick={onClick}/>
                ) }
            </div>
        );
    }

    componentDidUpdate() {
        var node = ReactDom.findDOMNode(this);
        if (node) {
            node.scrollTop = node.scrollHeight;
        }
    }
} 