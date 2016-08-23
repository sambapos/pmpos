import React from 'react';
import Order from './Order';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
};

export default class Orders extends React.Component {
    render() {
        const {ticket, onClick = () => { } } = this.props;
        return (
            <div className="orders" id="orders">
                {ticket.orders.map(({uid, name, quantity, price}) =>
                    <Order key={uid} name={name} quantity={quantity}
                        price={price.toFixed(2)} onClick={onClick}/>
                ) }
            </div>
        );
    }
} 