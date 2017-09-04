import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

import { SignIn } from '../actions/AutenticationActions';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.login}>Login</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
            placeholder="Email"
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            onChangeText={(password) => this.setState({password})}
            placeholder="Senha"
            secureTextEntry
            value={this.state.password}
          />
          <View style={styles.space}>
            <Button 
              color="#1a4f94"
              marginBottom={20}
              title='Entrar'
              onPress={(email, password) => this.props.SignIn(this.state.email, this.state.password)}
            />
          </View>

          <Text style={styles.error}>{this.props.loginError}</Text>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => (
  {
    loginError: state.AutenticationReducer.loginError
  }
);

export default connect(mapStateToProps, { SignIn })(Login);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
  },
  loginContainer: {
    flex: 1, 
    alignItems: 'center'
  },
  inputContainer: {
    flex: 2
  },
  login: {
    fontSize: 35,
    color: "#1a4f94"
  },
  input: {
    height: 45, 
    marginBottom: 20
  },
  espace: {
    marginBottom: 20
  },
  error: {
    color: 'red',
    marginTop: 10
  }
});