import React, { Component } from 'react';
import {
  Image,
  TouchableHighlight
} from 'react-native';

export default class DrawerIcon extends Component {
  constructor(props) {
    super(props);

     this.state = {
      action: 'DrawerOpen'
    };
  }
  
  _changeAction = () => {
    this.props.navigation.navigate('DrawerOpen');

    if (this.state.action == 'DrawerOpen') {
      this.setState({
        action: 'DrawerClose'
      });
    }
    else {
      this.setState({
        action: 'DrawerOpen'
      });
    }
  }

  render() {
    return (
      <TouchableHighlight
        style={{marginLeft: 15}}
        onPress={this._changeAction}
        underlayColor="#002c77"
      >
        <Image
          source={require('../images/menu.png')}
        />
      </TouchableHighlight>
    );
  }
}