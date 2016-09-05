import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Portion from './Portion';

export default class Portions extends React.Component {
  render() {
    const {portions, selectedPortion, onClick = () => { } } = this.props;
    return (
      <div className="portions">
        {portions.map(({name, price}) =>
          <Portion key={name}
              name={name} 
              price={price}
              onClick={onClick}
              isSelected={selectedPortion == name?true:false}/>
        ) }
      </div>
    );
  }
}