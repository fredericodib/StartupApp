import React, { Component } from 'react';
import axios from 'axios';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import { hasToken } from './actions/AutenticationActions';

import Login from './components/Login';

import { Routes } from './routes';


class App extends Component {
  
  render() {
    axios.defaults.baseURL = 'http://10.0.2.2:3000';
    axios.defaults.headers.common['Authorization'] = "Token token=" + this.props.token;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    if (this.props.token == '') {
      return (
        <Login />
      );
    }
    return (
      <View style={{flex: 1}}>
        <Spinner visible={this.props.loading} textContent={"Carregando..."} textStyle={{color: '#FFF'}} />
        <Routes />
      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    token: state.AutenticationReducer.token,
    user: state.AutenticationReducer.user,
    loading: state.LoadingReducer.loading
  }
);

export default connect(mapStateToProps, { hasToken })(App);