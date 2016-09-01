import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Categories extends React.Component {
    render() {
        const {categories, selectedCategory, onClick = () => { } } = this.props;
        return (
            <div className="categories" id="categories">
                {categories.map(({id, name, color, foreground}) =>
                    <RaisedButton
                        style={{'margin':2}}
                        label = {selectedCategory === name ? <b>-{name}-</b> : name}
                        labelColor = {foreground}
                        key={id}
                        backgroundColor={color}
                        onClick={onClick.bind(null, name) }/>
                ) }
            </div>
        );
    }
} 