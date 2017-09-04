import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logOut } from '../actions/AutenticationActions';

class Logout extends Component {
  componentWillMount() {
    this.props.logOut();
  }
  render() {
    return(null);
  }
}

export default connect(null, { logOut })(Logout);