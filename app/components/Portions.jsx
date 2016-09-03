import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class Portions extends React.Component {
  render() {
    const {portions, selectedPortion, onClick = () => { } } = this.props;
    return (
      <div className="portions">
        {portions.map(({name, price}) =>
          <RaisedButton
            className="portionButton"
            label = {name + ' - ' + price.toFixed(2) }
            labelColor = {selectedPortion === name ? 'White' : 'Black'}
            key={name}
            backgroundColor={selectedPortion === name ? 'Red' : 'White'}
            onClick={onClick.bind(null, name) }/>
        ) }
      </div>
    );
  }
}