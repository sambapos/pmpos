import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Categories extends React.Component {
    render() {
        const {categories, selectedCategory, onClick = () => { } } = this.props;
        return (
            <div className="categories" id="categories">
                {categories.map(({id, name, color}) =>
                    <span key={id}>
                        <RaisedButton 
                            backgroundColor={color}
                            onClick={onClick.bind(null, name) }>
                            <span>{selectedCategory===name ? <b>{name}</b> : name}</span>
                        </RaisedButton>
                    </span>
                ) }
            </div>
        );
    }
} 