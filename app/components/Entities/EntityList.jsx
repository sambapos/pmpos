import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class EntityList extends React.Component {
    render() {
        const entities = ['A10','A11','A12','A13']
        return (
            <div className="entityList">
                {entities.map(x =>
                    <RaisedButton
                        className = 'entityButton'
                        label = {x}
                        labelColor = 'black'
                        key={x}
                        backgroundColor='white'
                        onClick = {this.selectEntity}/>
                ) }
            </div>
        );
    }

    selectEntity = () => {
        this.context.router.push('/');
    }
} 

EntityList.contextTypes = {
    router: React.PropTypes.object
};