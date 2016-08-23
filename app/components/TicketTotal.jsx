import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

const styles = {
    root: {
        display: 'flex',
        alignContent: 'stretch'
    }
};

export default class TicketTotal extends React.Component {
    render() {
        const {ticket} = this.props;
        return (
            <div className="totals">
                <span className="ticketTotal">{ticket.totalAmount.toFixed(2)}</span>
            </div>
        );
    }
} 