import React from 'react';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';
import { getTerminalTickets } from '../queries';
import * as Actions from '../actions';

const style = {
    position: 'fixed',
    top: 0
};

const Total = (p) => {
    return <b>{p.total}</b>
}

class MyTicketLine extends React.Component {
    render() {
        const {ticket, onClick = () => { } } = this.props;
        return (<ListItem onClick={onClick.bind(null, ticket.id)}>
            <div style={{ 'display': 'flex' }}>
                <span style={{ 'flex': '1', 'fontWeight': 'bold' }}>{ticket.number}</span>
                <span style={{ 'flex': '3' }}>{ticket.entities.map(x=>x.name).join()}</span>
                <span >{ticket.remaining.toFixed(2)}</span>
            </div>
        </ListItem>)
    }
}

class MyTickets extends React.Component {

    loadItems(terminalId = this.props.terminalId) {
        this.props.loadMyTicketsRequest();
        getTerminalTickets(terminalId, (items) => {
            this.props.loadMyTicketsSuccess(items);
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.terminalId && nextProps.ticket !== this.props.ticket) {
            this.loadItems(nextProps.terminalId);
        } else if (nextProps.terminalId && nextProps.terminalId !== this.props.terminalId)
            this.loadItems(nextProps.terminalId);
    }

    render() {
        if (this.props.ticket) return null;
        if (!this.props.items) return (<div>Loading...</div>);
        return (
            <Paper className="myTickets">
                <List>
                    <Subheader>My Tickets</Subheader>
                    {this.props.items.sort((x, y) => new Date(y.lastOrderDate) - new Date(x.lastOrderDate))
                        .map((x) => <MyTicketLine key={x.id} ticket={x} onClick={this.props.onClick} />)}
                </List>
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    isFetching: state.myTickets.get('isFetching'),
    items: state.myTickets.get('items'),
    terminalId: state.app.get('terminalId')
})

const mapDispatchToProps = ({
    loadMyTicketsRequest: Actions.loadMyTicketsRequest,
    loadMyTicketsSuccess: Actions.loadMyTicketsSuccess
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyTickets)
