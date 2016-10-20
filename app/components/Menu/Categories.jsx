import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import { Button } from 'react-toolbox/lib/button';

class CategoryButton extends React.Component {
    render() {
        const { foreground, selectedCategory, name, color, onClick } = this.props;
        let caption = selectedCategory === name ? <b>-{name}-</b> : name;
        const style ={'color':foreground,
                      'backgroundColor':color,
                      'lineHeight':'1.3',
                      'wordWrap': 'breakWord',
                      'whiteSpace': 'normal',
                      'minHeight': '45px'
                     };
        return <Button
            className = 'categoryButton'
            style = {style}
            onClick={onClick.bind(null, name) }>{caption}</Button>
    }
}

class Categories extends React.Component {
    render() {
        const { categories = [], selectedCategory, onClick = () => { } } = this.props;
        return (
            <div className="categories" id="categories">
                {categories.map(({id, name, color, foreground}) =>
                    <CategoryButton
                        selectedCategory={selectedCategory}
                        name = {name}
                        foreground = {foreground}
                        key={id}
                        color={color}
                        onClick={onClick}/>
                ) }
            </div>
        );
    }

}

const mapStateToProps = state => ({
    selectedCategory: state.menu.get('selectedCategory')
})

export default connect(
    mapStateToProps
)(Categories)