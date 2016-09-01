import React from 'react';
import MenuItem from './MenuItem';

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