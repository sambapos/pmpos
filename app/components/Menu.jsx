import React from 'react';
import {connect} from 'react-redux';
import Categories from './Categories';
import MenuItems from './MenuItems';
import Paper from 'material-ui/Paper';
import * as Queries from '../queries';
import * as Actions from '../actions';

class Menu extends React.Component {
    componentDidMount() {
        if (!this.props.menu)
            this.refreshMenu();
    }

    render() {
        const {
            menu,
            menuItems,
            onCategoryClick = () => { },
            onMenuItemClick = () => { } } = this.props;
        return (
            <Paper className="menu">
                <Categories categories={menu ? menu.categories : undefined}
                    onClick={this.onCategoryClick}/>
                <MenuItems menuItems={menuItems}
                    onClick={onMenuItemClick}/>
            </Paper >
        );
    }

    refreshMenu() {
        Queries.getMenu((menu) => {
            Queries.getOrderTagColors((colors) => {
                var result = colors.reduce(function (map, obj) {
                    map[obj.name] = obj.value;
                    return map;
                }, {});
                this.props.setOrderTagColors(result);
            });
            this.props.setMenu(menu);
            if (menu.categories[0])
                this.onCategoryClick(menu.categories[0].name);
        })
    }

    onCategoryClick = (category) => {
        this.props.changeSelectedCategory(category);
        this.props.closeMessage();
        this.refreshMenuItems(category);
    }

    refreshMenuItems(category) {
        var categories = this.props.menu.categories;
        var c = categories.find(x => x.name === category);
        this.props.setMenuItems(c.menuItems);
    }
}

const mapStateToProps = state => ({
    menu: state.app.get('menu'),
    menuItems: state.app.get('menuItems')
})

const mapDispatchToProps = ({
    changeSelectedCategory: Actions.changeSelectedCategory,
    setOrderTagColors: Actions.setOrderTagColors,
    setMenu: Actions.setMenu,
    setMenuItems: Actions.setMenuItems,
    closeMessage: Actions.closeMessage
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)