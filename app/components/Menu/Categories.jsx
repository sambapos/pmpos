import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

class CategoryButton extends React.Component {
    render() {
        const { foreground, selectedCategory, name, color, onClick } = this.props;
        return <RaisedButton
            className = 'categoryButton'
            label = {selectedCategory === name ? <b>-{name}-</b> : name}
            labelColor = {foreground}
            backgroundColor={color}
            onClick={onClick.bind(null, name) }/>
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