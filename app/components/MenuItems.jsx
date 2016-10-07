import React from 'react';
import MenuItem from './MenuItem';

const MenuItems = ({menuItems = [], onClick = () => { } }) => {
    return (
        <div className="menuItems">
            {menuItems.map((menuItem) =>
                <MenuItem key={'mi_' + menuItem.id + '-' + menuItem.productId} menuItem={menuItem} onClick={onClick}/>
            ) }
        </div>
    );
}

export default MenuItems;