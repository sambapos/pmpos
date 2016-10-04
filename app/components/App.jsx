import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uuid from 'uuid';
import Header from './Header';
import Menu from './Menu';
import Orders from './Orders';
import TicketTotal from './TicketTotal';
import TicketTags from './TicketTags';
import Commands from './Commands';
import Signalr from '../signalr';
import Snackbar from 'material-ui/Snackbar';
import * as Queries from '../queries';
import * as Actions from '../actions';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menu: { categories: [{ id: 1, name: 'Loading' }] },
            menuItems: [
                { productId: 1, name: 'Loading...' }
            ],
            errorMessage: '',
            orderTagColors: [],
            ticket: {
                id: 10,
                uid: 'CyB2Fj__vkO1wePOCG9kjQ',
                type: 'Ticket',
                date: '2016-08-23T18:51:35',
                department: 'Restaurant',
                user: 'Administrator',
                terminal: 'Server',
                number: 'A0001',
                totalAmount: 9,
                remainingAmount: 9,
                note: '',
                entities: [],
                states: [],
                tags: [],
                calculations: [],
                orders: [
                    {
                        name: 'Tea',
                        id: 11,
                        uid: 'errq0C54fkSvfdVrX2X8Og',
                        quantity: 3,
                        price: 1,
                        calculatePrice: false,
                        decreaseInventory: true,
                        increaseInventory: false,
                        states: [
                            { stateName: 'Status', state: 'Submitted', stateValue: '' },
                            { stateName: 'GStatus', state: 'Gift', stateValue: '' }
                        ],
                        tags: []
                    }
                ]
            }
        }
    }

    componentDidMount() {
        if (this.props.terminalId) return;
        Signalr.connect(() => {
            console.log('Connected!!!');
        });
        if (localStorage['terminalId']) {
            var terminalId = localStorage['terminalId'];
            Queries.getTerminalExists(terminalId, (result) => {
                if (result) {
                    Queries.getTerminalTicket(terminalId, (ticket) => {
                        this.props.changeTerminalId(terminalId);
                        this.setState({ ticket: ticket });
                    })
                } else Queries.registerTerminal((terminalId) => this.updateTerminalId(terminalId));
            });
        }
        else Queries.registerTerminal((terminalId) => this.updateTerminalId(terminalId));
        this.refreshMenu();
    }

    updateTerminalId(terminalId) {
        localStorage['terminalId'] = terminalId;
        this.props.changeTerminalId(terminalId);
        Queries.createTerminalTicket(terminalId, (ticket) => {
            this.setState({ ticket: ticket });
        });
    }

    refreshMenu() {
        Queries.getMenu((menu) => {
            Queries.getOrderTagColors((colors) => {
                var result = colors.reduce(function (map, obj) {
                    map[obj.name] = obj.value;
                    return map;
                }, {});
                this.setState({ orderTagColors: result });
            });
            this.setState({ menu: menu });
            if (menu.categories[0])
                this.onCategoryClick(menu.categories[0].name);
        })
    }

    refreshMenuItems(category) {
        var categories = this.state.menu.categories;
        var c = categories.find(x => x.name === category);
        this.setState({ menuItems: c.menuItems });
    }

    render() {
        const {menu, menuItems, ticket, orderTagColors} = this.state;
        return (
            <div className = "mainDiv">
                <Header header = "New Ticket"/>
                <div className = "mainBody">
                    <Menu categories={menu.categories}
                        selectedCategory={this.props.selectedCategory}
                        onCategoryClick={this.onCategoryClick}
                        menuItems={menuItems}
                        onMenuItemClick={this.onMenuItemClick}/>
                    <Orders ticket={ticket}
                        orderTagColors={orderTagColors}
                        onChangePortion={this.changePortion}
                        getOrderTags={this.getOrderTags}
                        onCancelOrder={this.cancelOrder}
                        onOrderTagSelected={this.onOrderTagSelected} />
                </div>
                <TicketTags ticket={ticket}/>
                <Commands commands = {[
                    { command: this.cleanTicket, caption: 'Clear Orders', color: 'White' },
                    { command: this.selectTable, caption: 'Tables', color: 'White' },
                    { command: this.closeTicket, caption: 'Close', color: 'Red', foreground: 'White' }
                ]}/>
                <TicketTotal ticket={ticket}/>
                <Snackbar
                    open={this.props.isMessageOpen}
                    message={this.props.message}
                    autoHideDuration={4000}
                    onRequestClose={this.closeMessage}/>
            </div>
        );
    }

    getOrderTags = (orderUid, callback) => {
        Queries.getOrderTagsForTerminal(this.props.terminalId, orderUid, (orderTags) => {
            callback(orderTags);
        })
    }

    onOrderTagSelected = (orderUid, name, tag, callback) => {
        Queries.updateOrderTagOfTerminalTicket(this.props.terminalId, orderUid, name, tag, (ticket) => {
            this.setState({ ticket: ticket });
            callback(ticket);
        });
    }

    onCategoryClick = (category) => {
        this.props.changeSelectedCategory(category);
        this.closeMessage();
        this.refreshMenuItems(category);
    }

    onMenuItemClick = (productId, orderTags = '') => {
        Queries.addOrderToTerminalTicket(this.props.terminalId, productId, 1, orderTags, (ticket) => {
            this.setState({ ticket: ticket });
            this.closeMessage();
        });
    }

    cleanTicket = () => {
        Queries.clearTerminalTicketOrders(this.props.terminalId, (ticket) => {
            this.setState({ ticket: ticket });
        });
    }

    selectTable = () => {
        this.context.router.push('/entities');
    }

    closeTicket = () => {
        if (this.state.ticket.orders.length == 0) {
            this.props.updateMessage('Add orders to create a ticket.');
            return;
        }
        Queries.closeTerminalTicket(this.props.terminalId, (errorMessage) => {
            Queries.postRefresh();

            // notify other Clients that a Food Order Task has been Printed (for GQL Kitchen Display)
            Queries.broadcastMessage('{"eventName":"TASK_PRINTED","terminal":"Server","userName":"Administrator","productType":"Food"}');
            this.setState({ errorMessage: errorMessage });

            this.props.updateMessage('Ticket sucsessfully created!');
            Queries.createTerminalTicket(this.props.terminalId, (ticket) => {
                this.setState({ ticket: ticket });
            });
        });
    }

    changePortion = (orderUid, portion, callback) => {
        Queries.updateOrderPortionOfTerminalTicket(this.props.terminalId, orderUid, portion, (ticket) => {
            this.setState({ ticket });
            if (callback) callback();
        });
    }

    cancelOrder = (orderUid) => {
        Queries.cancelOrderOnTerminalTicket(this.props.terminalId, orderUid, (ticket) => {
            this.setState({ ticket });
        });
    }

    closeMessage = () => {
        if (this.props.isMessageOpen)
            this.props.closeMessage();
    };
}

App.contextTypes = {
    router: PropTypes.object
};

App.defaultProps = {
    message: '',
    isMessageOpen: false
}

App.PropTypes = {
    selectedCategory: PropTypes.string,
    terminalId: PropTypes.number,
    message: PropTypes.object,
    isMessageOpen: PropTypes.boolean
}

const mapStateToProps = state => ({
    selectedCategory: state.app.get('selectedCategory'),
    terminalId: state.app.get('terminalId'),
    message: state.app.getIn(['message', 'text']),
    isMessageOpen: state.app.getIn(['message', 'isOpen'])
})

const mapDispatchToProps = ({
    changeSelectedCategory: Actions.changeSelectedCategory,
    changeTerminalId: Actions.chageTerminalId,
    updateMessage: Actions.updateMessage,
    closeMessage: Actions.closeMessage
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)