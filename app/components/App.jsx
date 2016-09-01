import React from 'react';
import uuid from 'uuid';
import Header from './Header';
import Categories from './Categories';
import MenuItems from './MenuItems';
import Orders from './Orders';
import TicketTotal from './TicketTotal';
import TicketTags from './TicketTags';
import Commands from './Commands';
import Signalr from '../signalr';
import {getMenu, postRefresh,
    registerTerminal, createTerminalTicket, addOrderToTerminalTicket,
    getTerminalTicket, clearTerminalTicketOrders, closeTerminalTicket,
    getTerminalExists} from '../queries';

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
        const {menu, selectedCategory, menuItems, ticket} = this.state;
        return (
            <div className="mainDiv">
                <Header header={this.state.ticket.entityName}/>
                <Categories categories={menu.categories}
                    selectedCategory={selectedCategory}
                    onClick={this.onCategoryClick}/>
                <MenuItems menuItems={menuItems}
                    onClick={this.onMenuItemClick}/>
                <Orders ticket={ticket}/>
                <TicketTags ticket={ticket}/>
                <Commands commands = {[
                    { command: this.cleanTicket, caption: 'Clear Orders', color: 'White' },
                    { command: this.closeTicket, caption: 'Close', color: 'Red' }
                ]}/>
                <TicketTotal ticket={ticket}/>
            </div>
        );
    }

    onCategoryClick = (category) => {
        this.setState({ selectedCategory: category });
        this.refreshMenuItems(category);
    }

    onMenuItemClick = (productId) => {
        addOrderToTerminalTicket(this.state.terminalId, productId, 1, (ticket) => {
            this.setState({ ticket: ticket });
        });
    }

    cleanTicket = () => {
        clearTerminalTicketOrders(this.state.terminalId, (ticket) => {
            this.setState({ ticket: ticket });
        });
    }

    closeTicket = () => {
        closeTerminalTicket(this.state.terminalId, (errorMessage) => {
            postRefresh();
            this.setState({ errorMessage: errorMessage });
            createTerminalTicket(this.state.terminalId, (ticket) => {
                this.setState({ ticket: ticket });
            });
        });
    }
}