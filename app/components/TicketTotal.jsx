import React from 'react';
import {connect} from 'react-redux';

const TicketTotal = ({ticket}) => {

    const getTicketTotal = () => {
        return ticket ? ticket.totalAmount.toFixed(2) : '';
    }
    return (
        <div className="totals">
            <span className="ticketTotalLabel">Total: </span>
            <span className="ticketTotal">{getTicketTotal() }</span>
        </div>
    );
}

const mapStateToProps = state => ({
    ticket: state.app.get('ticket')
})

export default connect(
    mapStateToProps
)(TicketTotal)