import React from 'react';
import uuid from 'uuid';
import Header from './Header';
import Menu from './Menu';
import Orders from './Orders';
import TicketTotal from './TicketTotal';
import TicketTags from './TicketTags';
import Commands from './Commands';
import Signalr from '../signalr';
import Snackbar from 'material-ui/Snackbar';
import {getMenu, postRefresh,
    registerTerminal, createTerminalTicket, addOrderToTerminalTicket,
    getTerminalTicket, clearTerminalTicketOrders, closeTerminalTicket,
    getTerminalExists, updateOrderPortionOfTerminalTicket,
    cancelOrderOnTerminalTicket, getOrderTagColors, getOrderTagsForTerminal,
    updateOrderTagOfTerminalTicket, broadcastMessage} from '../queries';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: { categories: [{ id: 1, name: 'Loading' }] },
            selectedCategory: '',
            menuItems: [
                { productId: 1, name: 'Loading...' }
            ],
            terminalId: '',
            errorMessage: '',
            isMessageOpen: false,
            message: '',
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
        Signalr.connect(() => {
            console.log('Connected!!!');
        });
        if (localStorage['terminalId']) {
            var terminalId = localStorage['terminalId'];
            getTerminalExists(terminalId, (result) => {
                if (result) {
                    getTerminalTicket(terminalId, (ticket) => {
                        this.setState({ terminalId: terminalId, ticket: ticket });
                    })
                } else registerTerminal((terminalId) => this.updateTerminalId(terminalId));
            });
        }
        else registerTerminal((terminalId) => this.updateTerminalId(terminalId));
        this.refreshMenu();
    }

    updateTerminalId(terminalId) {
        localStorage['terminalId'] = terminalId;
        this.setState({ terminalId: terminalId });
        createTerminalTicket(terminalId, (ticket) => {
            this.setState({ ticket: ticket });
        });
    }

    refreshMenu() {
        getMenu((menu) => {
            getOrderTagColors((colors) => {
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
        const {menu, selectedCategory, menuItems, ticket, orderTagColors} = this.state;
        return (
            <div className = "mainDiv">
                <Header header = "New Ticket"/>
                <div className = "mainBody">
                    <Menu categories={menu.categories}
                        selectedCategory={selectedCategory}
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
                    { command: this.closeTicket, caption: 'Close', color: 'Red', foreground: 'White' }
                ]}/>
                <TicketTotal ticket={ticket}/>
                <Snackbar
                    open={this.state.isMessageOpen}
                    message={this.state.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestCloseMessage}/>
            </div>
        );
    }

    getOrderTags = (orderUid, callback) => {
        getOrderTagsForTerminal(this.state.terminalId, orderUid, (orderTags) => {
            callback(orderTags);
        })
    }

    onOrderTagSelected = (orderUid, name, tag, callback) => {
        updateOrderTagOfTerminalTicket(this.state.terminalId, orderUid, name, tag, (ticket) => {
            this.setState({ ticket: ticket });
            callback(ticket);
        });
    }

    onCategoryClick = (category) => {
        this.setState({ selectedCategory: category, isMessageOpen: false });
        this.refreshMenuItems(category);
    }

    onMenuItemClick = (productId, orderTags = '') => {
        addOrderToTerminalTicket(this.state.terminalId, productId, 1, orderTags, (ticket) => {
            this.setState({ ticket: ticket, isMessageOpen: false });
        });
    }

    cleanTicket = () => {
        clearTerminalTicketOrders(this.state.terminalId, (ticket) => {
            this.setState({ ticket: ticket });
        });
    }

    closeTicket = () => {
        if (this.state.ticket.orders.length == 0) {
            this.setState({ isMessageOpen: true, message: 'Add orders to create a ticket.' });
            return;
        }
        closeTerminalTicket(this.state.terminalId, (errorMessage) => {
            postRefresh();
            
            // notify other Clients that a Food Order Task has been Printed (for GQL Kitchen Display)
            broadcastMessage('{"eventName":"TASK_PRINTED","terminal":"Server","userName":"Administrator","productType":"Food"}');

            this.setState({ errorMessage: errorMessage, isMessageOpen: true, message: 'Ticket sucsessfully created!' });
            createTerminalTicket(this.state.terminalId, (ticket) => {
                this.setState({ ticket: ticket });
            });
        });
    }

    changePortion = (orderUid, portion, callback) => {
        updateOrderPortionOfTerminalTicket(this.state.terminalId, orderUid, portion, (ticket) => {
            this.setState({ ticket });
            if (callback) callback();
        });
    }

    cancelOrder = (orderUid) => {
        cancelOrderOnTerminalTicket(this.state.terminalId, orderUid, (ticket) => {
            this.setState({ ticket });
        });
    }

    handleRequestCloseMessage = () => {
        this.setState({
            isMessageOpen: false
        });
    };
}