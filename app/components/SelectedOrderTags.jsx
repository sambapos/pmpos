import React from 'react';
import Order from './Order';

export default class SelectedOrderTags extends React.Component {
    render() {
        const {orderTags} = this.props;
        if (!orderTags || orderTags.length === 0) return null;
        return (
            <div className="orderTags" >
                {orderTags.map(({tag, tagName, price, quantity}) =>
                    <div className='orderTag' key={tag} style={{ 'backgroundColor': this.getColor(tag) }}>
                        <span className='orderTagQuantity orderTagSection'>{quantity > 1 ? quantity + ' x' : ''}</span>
                        <span className='orderTagName orderTagSection'>{tag}</span>
                        <span className='orderTagPrice orderTagSection'>{price > 0 ? price.toFixed(2) : '' }</span>
                    </div>
                ) }
            </div>
        );
    }

    getColor = (tag) => {
        var result = this.props.orderTagColors[tag];
        if (result) return result;
        return 'LightGray';
    }

} 