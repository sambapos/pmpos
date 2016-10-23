import React from 'react';
import OrderTagGroup from './OrderTagGroup';

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