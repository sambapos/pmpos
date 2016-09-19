import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import OrderTagGroup from './OrderTagGroup';
import Subheader from 'material-ui/Subheader';

export default class OrderTags extends React.Component {
  render() {
    const {orderTags, onClick = () => { } } = this.props;
    return (
      <div className="orderTags">
        {orderTags.map(({name, tags}) =>
          <OrderTagGroup key={name}
            name={name}
            tags={tags}
            onClick={onClick}
            isSelected={orderTags[0].name === name}/>
        ) }
      </div>
    );
  }
}