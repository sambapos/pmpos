import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { List, ListItem, ListSubHeader, ListDivider, ListItemContent, ListCheckbox } from 'react-toolbox/lib/list';
import { connect } from 'react-redux';
import { getTerminalTickets } from '../queries';
import * as Actions from '../actions';

const Total = (p) => {
    return <b>{p.total}</b>
}

class MyTicketLine extends React.Component {
    render() {
        const {ticket, onClick = () => { } } = this.props;
        return (<ListItem selectable ripple={false}
            onClick={onClick.bind(null, ticket.id)}>
            <ListItemContent>
                <div style={{ 'display': 'flex', 'margin': '4px' }}>
                    <span className="myListTicketNumber">{ticket.number}</span>
                    <span className="myListEntity">{ticket.entities.map(x => x.name).join()}</span>
                    <span className="myListRemaining">{ticket.remaining.toFixed(2)}</span>
                </div>
            </ListItemContent>
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
                    <ListSubHeader caption="My Tickets" />
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
