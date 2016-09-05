import React from 'react';

export default class TicketTotal extends React.Component {
    render() {
        const {ticket} = this.props;
        return (
            <div className="totals">
                <span className="ticketTotalLabel">Total: </span>
                <span className="ticketTotal">{ticket.totalAmount.toFixed(2) }</span>
            </div>
        );
    }
} 