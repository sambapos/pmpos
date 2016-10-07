import React from 'react';
import Order from './Order';
import ReactDom from 'react-dom';
import Paper from 'material-ui/Paper';
import {postRefresh} from '../queries';

export default class Orders extends React.Component {
    render() {
        const {ticket, onClick = () => { }, onChangePortion = () => { }, onCancelOrder = () => { }, onOrderTagSelected = () => { } } = this.props;
        return (
            <Paper className="orders" id="orders">
                {ticket.orders.map(({uid, name, quantity, price, priceTag, portion, productId, tags}) =>
                    <Order key={uid}
                        name={name}
                        quantity={quantity}
                        price={price.toFixed(2) }
                        priceTag={priceTag}
                        portion={portion}
                        productId={productId}
                        orderTags={tags}
                        onClick={onClick}
                        orderUid={uid}
                        getOrderTags = {this.props.getOrderTags}
                        onChangePortion={onChangePortion}
                        onOrderTagSelected={onOrderTagSelected}
                        onCancelOrder={onCancelOrder}/>
                ) }
            </Paper>
        );
    }

    componentDidUpdate() {
        var node = ReactDom.findDOMNode(this);
        if (node) {
            node.scrollTop = node.scrollHeight;
        }
    }
} 