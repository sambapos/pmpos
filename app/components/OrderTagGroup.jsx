import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import OrderTag from './OrderTag';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';


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