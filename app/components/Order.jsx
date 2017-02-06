import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListSubHeader, ListDivider, ListItemContent, ListCheckbox } from 'react-toolbox/lib/list';
import Portions from './Portions';
import OrderTags from './OrderTags';
import SelectedOrderTags from './SelectedOrderTags';
import {SelectedOrderStates} from './SelectedOrderStates';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { getProductPortions, getOrderTagsForTerminal } from '../queries';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as Queries from '../queries';
import * as Actions from '../actions';

const customContentStyle = {
    'width': '95%'
};

class Order extends React.Component {
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
        const {id, name, quantity, price, priceTag, portion, productId, orderUid, orderTags, orderStates,
            onClick = () => { } } = this.props;
        const detailActions = [
            <FlatButton
                label="Gift"
                primary={true}
                onClick={this.onOrderGift}
                />,
            <FlatButton
                label="Remove Order"
                primary={true}
                onClick={this.onOrderCancelled} />,
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleDetailsClose} />
        ];

        var orderName = portion != 'Normal' ? name + '.' + portion : name;
        const orderLine =
            <div className="orderContent">
                <div className="order">
                    <span className="orderQuantity">{quantity}</span>
                    <span className="orderName">{orderName}</span>
                    <span className="orderPrice">
                        <span className="orderPriceTag">{priceTag}</span>
                        <span >{price}</span>
                    </span>
                </div>
                <SelectedOrderStates orderStates={orderStates}/>
                <SelectedOrderTags orderTags={orderTags} />
            </div>;

        return (
            <div key={id}>
                <ListItem selectable ripple={false} onClick={this.handleDetailsOpen.bind(null, productId, portion)}>
                    <ListItemContent>
                        {orderLine}
                    </ListItemContent>
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
                            onClick={this.onPortionSelected} />
                        <OrderTags orderTags={this.state.orderTags}
                            onClick={this.onOrderTagSelected} />
                    </div>
                </Dialog>
            </div>
        );
    }

    onPortionSelected = (name) => {
        Queries.updateOrderPortionOfTerminalTicket(this.props.terminalId, this.props.orderUid, name, (ticket) => {
            this.props.setTicket(ticket);
            if (this.state.orderTags && this.state.orderTags.length > 0) {
                this.getOrderTags(this.props.orderUid, (orderTags) => {
                    this.setState({ orderTags: orderTags, selectedPortion: name });
                });
            }
            else
                this.handleDetailsClose();
        });
    }

    onOrderTagSelected = (name, tag) => {
        Queries.updateOrderTagOfTerminalTicket(this.props.terminalId, this.props.orderUid, name, tag, (ticket) => {
            this.props.setTicket(ticket);
            this.getOrderTags(this.props.orderUid, (orderTags) => {
                this.setState({ orderTags: orderTags, isDetailsOpen: true });
            });
        });
    }

    onOrderCancelled = () => {
        Queries.cancelOrderOnTerminalTicket(this.props.terminalId, this.props.orderUid, (ticket) => {
            this.props.setTicket(ticket);
        });
        this.handleDetailsClose();
    }

    onOrderGift = () => {
        Queries.executeAutomationCommandForTerminalTicket(this.props.terminalId, this.props.orderUid, 'Gift', '', (ticket) => {
            this.props.setTicket(ticket);
        })
        this.handleDetailsClose();
    }

    handleDetailsOpen = (productId, portion) => {
        if (this.props.locked) return;
        getProductPortions(productId, (portions) => {
            this.setState({ isDetailsOpen: true, portions: portions, selectedPortion: portion });
        });
        this.getOrderTags(this.props.orderUid, (orderTags) => {
            this.setState({ orderTags: orderTags });
        });
    };

    getOrderTags = (orderUid, callback) => {
        Queries.getOrderTagsForTerminal(this.props.terminalId, orderUid, (orderTags) => {
            callback(orderTags);
        })
    }

    handleDetailsClose = () => {
        this.setState({ isDetailsOpen: false });
    };
}

const mapStateToProps = state => ({
    terminalId: state.app.get('terminalId'),
    ticket: state.app.get('ticket')
})

const mapDispatchToProps = ({
    setTicket: Actions.setTicket
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order)