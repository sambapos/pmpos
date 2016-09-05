import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Portions from './Portions';
import SelectedOrderTags from './SelectedOrderTags';
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
        const {id, name, quantity, price, priceTag, portion, productId, orderUid, orderTags, orderTagColors, onClick = () => { }, onCancelOrder = () => { } } = this.props;
        const detailActions = [
            <FlatButton
                label="Remove Order"
                primary={true}
                onClick={this.onOrderCancelled}
                />,
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleDetailsClose}
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
                    <SelectedOrderTags orderTags={orderTags}
                        orderTagColors={orderTagColors}/>
                </ListItem>
                <Dialog
                    title={name}
                    actions={detailActions}
                    modal={true}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
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
        this.props.onChangePortion(this.props.orderUid, name, 
            () => this.handleDetailsClose());
    }

    onOrderCancelled = () => {
        this.props.onCancelOrder(this.props.orderUid);
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