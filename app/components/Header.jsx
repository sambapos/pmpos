import React from 'react';
import AppBar from 'material-ui/AppBar';

const style = {
  position: 'fixed',
  top: 0
};

export default class Header extends React.Component {
  render() {
    return (
      <AppBar
        className = "header"
        title={this.props.header}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
    );
  }
}
