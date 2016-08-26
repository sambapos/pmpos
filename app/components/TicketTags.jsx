import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class TicketTags extends React.Component {
    render() {
        const {ticket} = this.props;
        if (ticket.tags)
            return (
                <div className="ticketTags">
                    {ticket.tags.map(({tagName, tag}) =>
                        <span key={tag}>{tagName}: {tag}</span>
                    ) }
                </div>
            );
        else return null;
    }
} 