import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
};

export default class MenuItems extends React.Component {
    render() {
        const {menuItems, onClick = () => { } } = this.props;
        return (
            <div className="menuItems" id="menuItems">
                {menuItems.map(({id, name, color}) =>
                    <Paper className="menuButton" key={id}>
                        <ListItem className="menuButtonContent"
                           onClick={onClick.bind(null,name)}>
                            {name}
                        </ListItem>
                    </Paper>
                ) }
            </div>
        );
    }
} 