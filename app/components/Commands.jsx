import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Commands extends React.Component {
    render() {
        const {commands} = this.props;
        return (
            <div className="commands" id="commands">
                {commands.map(({command, caption, color, foreground}) =>
                    <RaisedButton
                        className="commandButton"
                        key={caption}
                        label={caption}
                        labelColor = {foreground}
                        backgroundColor={color}
                        onClick={command}>
                    </RaisedButton>
                ) }
            </div>
        );
    }
} 