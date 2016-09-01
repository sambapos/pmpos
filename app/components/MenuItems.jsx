import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import MenuItem from './MenuItem';
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
            <div className="menuItems">
                {menuItems.map((menuItem) =>
                    <MenuItem key={menuItem.productId} menuItem={menuItem} onClick={onClick}/>
                ) }
            </div>
        );
    }
} 