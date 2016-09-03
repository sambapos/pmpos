import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Portions from './Portions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {getProductPortions} from '../queries';

const customContentStyle = {
    width: '95%',
    maxWidth: 'none'
};

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isDetailsOpen: false, portions: [{ name: 'loading...' }] };
    }
    render() {
        const {id, name, quantity, price, priceTag, portion, productId, orderUid, onClick = () => { }, onCancelOrder = () => { } } = this.props;
        const detailActions = [
            <FlatButton
                label="Remove Order"
                primary={true}
                onTouchTap={onCancelOrder.bind(null, orderUid) }
                />,
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleDetailsClose}
                />
        ];
        var orderName = portion != 'Normal' ? name + '.' + portion : name;
        return (
            <div key={id}>
                <ListItem  className="order" onClick={this.handleDetailsOpen.bind(null, productId) }>
                    <div className="order">
                        <span className="orderQuantity">{quantity}</span>
                        <span className="orderName">{orderName}</span>
                        <span className="orderPrice">
                            <span className="orderPriceTag">{priceTag}</span>
                            <span >{price}</span>
                        </span>
                    </div>
                </ListItem>
                <Dialog
                    title={name}
                    actions={detailActions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.isDetailsOpen}>
                    <Portions portions={this.state.portions}
                        selectedPortion={portion}
                        onClick={this.onPortionSelected}/>
                </Dialog>
                <Divider/>
            </div>
        );
    }

    onPortionSelected = (name) => {
        this.props.onChangePortion(this.props.orderUid, name);
        this.handleDetailsClose();
    }

    handleDetailsOpen = (productId) => {
        getProductPortions(productId, (portions) => {
            this.setState({ isDetailsOpen: true, portions: portions });
        });
    };

    handleDetailsClose = () => {
        this.setState({ isDetailsOpen: false });
    };
} 