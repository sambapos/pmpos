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

    componentDidMount() {
        if (localStorage['terminalId']) {
            var terminalId = localStorage['terminalId'];
            Queries.getTerminalExists(terminalId, (result) => {
                if (result) {
                    Queries.getTerminalTicket(terminalId, (ticket) => {
                        this.props.changeTerminalId(terminalId);
                        this.props.setTicket(ticket);
                    })
                } else Queries.registerTerminal((terminalId) => this.updateTerminalId(terminalId));
            });
        }
        else Queries.registerTerminal((terminalId) => this.updateTerminalId(terminalId));
        if (this.props.terminalId) return;
        Signalr.connect(() => {
            console.log('Connected!!!');
        });
        this.refreshMenu();
    }

    updateTerminalId(terminalId) {
        localStorage['terminalId'] = terminalId;
        this.props.changeTerminalId(terminalId);
        Queries.createTerminalTicket(terminalId, (ticket) => {
            this.props.setTicket(ticket);
        });
    }

    refreshMenu() {
        Queries.getMenu((menu) => {
            Queries.getOrderTagColors((colors) => {
                var result = colors.reduce(function (map, obj) {
                    map[obj.name] = obj.value;
                    return map;
                }, {});
                this.props.setOrderTagColors(result);
            });
            this.props.setMenu(menu);
            if (menu.categories[0])
                this.onCategoryClick(menu.categories[0].name);
        })
    }

    refreshMenuItems(category) {
        var categories = this.props.menu.categories;
        var c = categories.find(x => x.name === category);
        this.props.setMenuItems(c.menuItems);
    }

    render() {
        const {menu, menuItems, ticket, orderTagColors} = this.props;
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
            this.props.setTicket(ticket);
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
            this.props.setTicket(ticket);
            this.closeMessage();
        });
    }

    cleanTicket = () => {
        Queries.clearTerminalTicketOrders(this.props.terminalId, (ticket) => {
            this.props.setTicket(ticket);
        });
    }

    selectTable = () => {
        this.context.router.push('/entities');
    }

    closeTicket = () => {
        if (this.props.ticket.orders.length == 0) {
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
                this.props.setTicket(ticket);
            });
        });
    }

    changePortion = (orderUid, portion, callback) => {
        Queries.updateOrderPortionOfTerminalTicket(this.props.terminalId, orderUid, portion, (ticket) => {
            this.props.setTicket(ticket);
            if (callback) callback();
        });
    }

    cancelOrder = (orderUid) => {
        Queries.cancelOrderOnTerminalTicket(this.props.terminalId, orderUid, (ticket) => {
            this.props.setTicket(ticket);
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
    isMessageOpen: false,
    ticket: { id: 0, totalAmount: 0, orders: [] },
    orderTagColors: [],
    menu: { categories: [] },
    menuItems: []
}

App.PropTypes = {
    selectedCategory: PropTypes.string,
    terminalId: PropTypes.number,
    message: PropTypes.object,
    isMessageOpen: PropTypes.boolean,
    ticket: PropTypes.object,
    orderTagColors: PropTypes.object,
    menu: PropTypes.object,
    menuItems: PropTypes.object
}

const mapStateToProps = state => ({
    selectedCategory: state.app.get('selectedCategory'),
    terminalId: state.app.get('terminalId'),
    message: state.app.getIn(['message', 'text']),
    isMessageOpen: state.app.getIn(['message', 'isOpen']),
    ticket: state.app.get('ticket'),
    orderTagColors: state.app.get('orderTagColors'),
    menu: state.app.get('menu'),
    menuItems: state.app.get('menuItems')
})

const mapDispatchToProps = ({
    changeSelectedCategory: Actions.changeSelectedCategory,
    changeTerminalId: Actions.chageTerminalId,
    updateMessage: Actions.updateMessage,
    closeMessage: Actions.closeMessage,
    setTicket: Actions.setTicket,
    setOrderTagColors: Actions.setOrderTagColors,
    setMenu: Actions.setMenu,
    setMenuItems: Actions.setMenuItems
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)