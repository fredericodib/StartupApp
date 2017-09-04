import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Picker,
  Alert
} from 'react-native';
import { connect } from 'react-redux';

import { updateStudent } from '../actions/AutenticationActions';
import { activeLoading } from '../actions/LoadingActions';
import TopBar from '../components/TopBar';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email,
      birthday: this.props.user.birthday,
      name: this.props.user.name,
      student_class: this.props.user.student_class,
      gender: this.props.user.gender,
      password: '',
      registration: this.props.user.registration,
      password_confirmation: '',
    };
  }

  _action(email, birthday, name, student_class, gender, registration, password, password_confirmation) {
    this.props.updateStudent(email, birthday, name, student_class, gender, registration, password, password_confirmation);
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar name='Perfil' />
        <View style={styles.section}>

          <Text>Meus dados:</Text>  

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(email) => this.setState({email})}
              placeholder="Email"
              value={this.state.email}
            />
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({name})}
              placeholder="Nome"
              value={this.state.name}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(birthday) => this.setState({birthday})}
              placeholder="Data de Nascimento"
              value={this.state.birthday}
            />
            <TextInput
              style={styles.input}
              onChangeText={(registration) => this.setState({registration})}
              placeholder="Matricula"
              value={this.state.registration}
            />
          </View>

          <View style={styles.inputContainer}>
            <Picker
              style={styles.input}
              onValueChange={(gender) => this.setState({gender})}
              placeholder="Sexo"
              selectedValue={this.state.gender}
            >
              <Picker.Item label="Masculino" value="masculine" />
              <Picker.Item label="Feminino" value="feminine" />
            </Picker>
            
            <Picker
              style={styles.input}
              onValueChange={(student_class) => this.setState({student_class})}
              placeholder="Turma"
              selectedValue={this.state.student_class}
            >
              <Picker.Item label="A" value="A" />
              <Picker.Item label="B" value="B" />
              <Picker.Item label="C" value="C" />
              <Picker.Item label="D" value="D" />
              <Picker.Item label="E" value="E" />
            </Picker>
          </View>

          <Text>Alterar Senha:</Text>  

          <TextInput
            onChangeText={(password) => this.setState({password})}
            placeholder="Senha"
            secureTextEntry
            value={this.state.password}
          />
          <TextInput
            onChangeText={(password_confirmation) => this.setState({password_confirmation})}
            placeholder="Confirmação de Senha"
            secureTextEntry
            value={this.state.password_confirmation}
          />

          <View style={styles.space}>
            <Button 
              color="#1a4f94"
              marginBottom={20}
              title='Salvar Mudanças'
              onPress={(email, birthday, name, student_class, gender, registration, password, password_confirmation) => this._action(
                this.state.email, 
                this.state.birthday,
                this.state.name,
                this.state.student_class,
                this.state.gender,
                this.state.registration,
                this.state.password,
                this.state.password_confirmation)}
            />
          </View>

          <Text style={styles.error}>{this.props.ProfileError}</Text>
        </View>
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginError == '') {
      Alert.alert(
        'Usuario atualizado com sucesso!'
      );
    }
    else {
      Alert.alert(
        'Erro',
        nextProps.loginError.join("\n")
      );
    }
  }
}


const mapStateToProps = state => (
  {
    user: state.AutenticationReducer.user,
    loginError: state.AutenticationReducer.loginError
  }
);

export default connect(mapStateToProps, { updateStudent, activeLoading })(Profile);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    flex: 1,
    marginTop: 15,
    padding: 25
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  input: {
    width: 150
  },
  space: {
    marginTop: 20
  }
});