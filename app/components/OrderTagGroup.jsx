import React from 'react';
import Subheader from 'material-ui/Subheader';
import OrderTag from './OrderTag';

export default class OrderTagGroup extends React.Component {
    render() {
        const {name, tags = [], onClick = () => { } } = this.props;
        const style = {
            'display': 'flex',
            'flexWrap': 'wrap'
        };
        const style2 = {
            'height': 'auto'
        };

        var items = tags.map(({name, color, labelColor, caption}) =>
            <OrderTag key={name + this.props.name}
                name={name}
                groupName={this.props.name}
                caption={caption}
                color={color}
                labelColor={labelColor}
                onClick={onClick}/>);

        return (
            <div className='orderTagGroupSection'>
                <Subheader>{name}</Subheader>
                <div className='orderTagGroup'>
                    {items}
                </div>
            </div>);
    }
}