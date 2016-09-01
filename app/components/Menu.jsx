import React from 'react';
import Categories from './Categories';
import MenuItems from './MenuItems';

export default class Menu extends React.Component {
    render() {
        const {
            categories,
            selectedCategory,
            menuItems, 
            onCategoryClick = () => { },
            onMenuItemClick = () => { } } = this.props;
        return (
            <div className="menu">
                <Categories categories={categories}
                    selectedCategory={selectedCategory}
                    onClick={onCategoryClick}/>
                <MenuItems menuItems={menuItems}
                    onClick={onMenuItemClick}/>
            </div>
        );
    }
} 