import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Portions from './Portions';
import OrderTags from './OrderTags';
import SelectedOrderTags from './SelectedOrderTags';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {getProductPortions, getOrderTagsForTerminal} from '../queries';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const customContentStyle = {
    'width': '95%'
};

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDetailsOpen: false,
            selectedPortion: '',
            portions: [{ name: 'loading...' }],
            orderTags: [{ name: 'loading...', price: 1 }]
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const {id, name, quantity, price, priceTag, portion, productId, orderUid, orderTags, orderTagColors, onClick = () => { }, onCancelOrder = () => { } } = this.props;
        const detailActions = [
            <FlatButton
                label="Remove Order"
                primary={true}
                onClick={this.onOrderCancelled}/>,
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleDetailsClose}/>
        ];

        var orderName = portion != 'Normal' ? name + '.' + portion : name;

        const orderLine =
            <div>
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
            </div>;

        return (
            <div key={id}>
                <ListItem  className="order" onClick={this.handleDetailsOpen.bind(null, productId, portion) }>
                    {orderLine}
                </ListItem>
                <Dialog
                    title={orderLine}
                    actions={detailActions}
                    modal={true}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                    open={this.state.isDetailsOpen}>
                    <div className='dialogContent'>
                        <Portions portions={this.state.portions}
                            selectedPortion={this.state.selectedPortion}
                            onClick={this.onPortionSelected}/>
                        <OrderTags orderTags={this.state.orderTags}
                            onClick={this.onOrderTagSelected}/>
                    </div>
                </Dialog>
                <Divider/>
            </div>
        );
    }

    onPortionSelected = (name) => {
        this.props.onChangePortion(this.props.orderUid, name,
            () => {
                if (this.state.orderTags && this.state.orderTags.length > 0) {
                    this.props.getOrderTags(this.props.orderUid, (orderTags) => {
                        this.setState({ orderTags: orderTags, selectedPortion: name });
                    });
                }
                else
                    this.handleDetailsClose();
            });
    }

    onOrderTagSelected = (name, tag) => {
        this.props.onOrderTagSelected(this.props.orderUid, name, tag, (ticket) => {
            this.props.getOrderTags(this.props.orderUid, (orderTags) => {
                this.setState({ orderTags: orderTags, isDetailsOpen: true });
            });
        });
    }

    onOrderCancelled = () => {
        this.props.onCancelOrder(this.props.orderUid);
        this.handleDetailsClose();
    }

    handleDetailsOpen = (productId, portion) => {
        getProductPortions(productId, (portions) => {
            this.setState({ isDetailsOpen: true, portions: portions, selectedPortion: portion });
        });
        this.props.getOrderTags(this.props.orderUid, (orderTags) => {
            this.setState({ orderTags: orderTags });
        });
    };

    handleDetailsClose = () => {
        this.setState({ isDetailsOpen: false });
    };
} 