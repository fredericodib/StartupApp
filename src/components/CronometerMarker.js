import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  TouchableHighlight,
  TextInput,
  Picker,
  Vibration,
  Alert,
  AsyncStorage
} from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';

import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
 
class CronometerMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      totalDuration: '',
      breakDuration: '',
      timerReset: false,
      inBreak: false,
      ready: false,
      numberOfSeries: 1,
      CurrentNumberOfSerie: 1,
      discipline: ''

    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.applyChange = this.applyChange.bind(this);
    this.changeTypeNotInBreack = this.changeTypeNotInBreack.bind(this);
    this.changeTypeInBreack = this.changeTypeInBreack.bind(this);
    this.sendData = this.sendData.bind(this);
  }
 
  toggleTimer() {
    this.setState({timerStart: !this.state.timerStart, timerReset: false});
  }
 
  resetTimer() {
    this.setState({timerStart: false, timerReset: true, ready: false, inBreak: false});
  }

  applyChange() {
    if ((this.state.breakDuration != '') && (this.state.totalDuration != '')) {
      this.setState({timerStart: false, timerReset: true, ready: true, inBreak: false});
    }
    else {
      Alert.alert(
        'Todos os campos devem ser preenchidos!'
      );
    }
  }
  
  changeTypeNotInBreack() {
    if (this.state.CurrentNumberOfSerie == this.state.numberOfSeries) {
      this.setState({timerStart: false, timerReset: true, ready: false, inBreak: false, CurrentNumberOfSerie: 1});
      return 'complite'
    }
    else {
      this.setState({timerStart: true, timerReset: true, inBreak: true});
    }
  }

  changeTypeInBreack() {
    this.setState({timerReset: true, inBreak: false, timerStart: true, CurrentNumberOfSerie: this.state.CurrentNumberOfSerie + 1});
  }

  getFormattedTime(time) {
      this.currentTime = time;
  };

  sendData() {
    let data = { 
      cronometer_log: {
        time: this.state.totalDuration,
        discipline_id: this.state.discipline
      }
    }
    axios.post('/api/cronometer/create.json', data)
      .catch( async (error) => {
        let cronometerLog = await AsyncStorage.getItem('CRONOMETERLOG');
        console.log(cronometerLog);
      });
  }

  
  componentWillMount() {
    this.setState({discipline: this.props.disciplines[0].id});
  }

  render() {

    return (
      <ScrollView style={styles.container} >
        { ((this.state.ready) && (!this.state.inBreak)) && 
          <View style={styles.cronContainer}>
            <Text style={{fontSize: 20, marginBottom: 10, color: '#2066c0'}}>Estudos!</Text>
            <Timer totalDuration={this.state.totalDuration * 1000} msecs start={this.state.timerStart}
              reset={this.state.timerReset}
              options={options}
              handleFinish={() => handleTimerComplete(this.changeTypeNotInBreack, this.sendData)}
              getTime={this.getFormattedTime} 
            />
            <TouchableHighlight onPress={this.toggleTimer} underlayColor='#ddd'>
              <Text style={{fontSize: 30, marginBottom: 20}}>{!this.state.timerStart ? "Iniciar" : "Pausar"}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.resetTimer} underlayColor='#ddd'>
              <Text style={{fontSize: 30, marginBottom: 20}}>Cancelar</Text>
            </TouchableHighlight>
             <Text>O cronometro será canceledo ao sair da padina.</Text>
          </View>
        }

        { ((this.state.ready) && (this.state.inBreak)) && 
          <View style={styles.cronContainer}>
            <Text style={{fontSize: 20, marginBottom: 10, color: '#f0ad4e'}}>Intervalo!</Text>
            <Timer totalDuration={this.state.breakDuration * 1000} msecs start={this.state.timerStart}
              reset={this.state.timerReset}
              options={optionsInBreak}
              handleFinish={() => handleTimerCompleteBreak(this.changeTypeInBreack)}
              getTime={this.getFormattedTime} 
            />
            <TouchableHighlight onPress={this.toggleTimer} underlayColor='#ddd'>
              <Text style={{fontSize: 30, marginBottom: 20}}>{!this.state.timerStart ? "Iniciar" : "Pausar"}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.resetTimer} underlayColor='#ddd'>
              <Text style={{fontSize: 30, marginBottom: 20}}>Cancelar</Text>
            </TouchableHighlight>
            <Text>O cronometro será canceledo ao sair da padina.</Text>
          </View>
        }
        

        { (!this.state.ready) && 
          <View>
            <Text style={styles.marginBottom} >Recomendado: Séries de 40min - 15min</Text>

            <Text>Selecione o número de séries.</Text>
            <Picker
              style={styles.input}
              onValueChange={(numberOfSeries) => this.setState({numberOfSeries})}
              placeholder="Número de séries."
              selectedValue={this.state.numberOfSeries}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker>
            <Text>Selecione o tempo de estudo de cada série(em minutos).</Text>
            <TextInput
              style={styles.input}
              onChangeText={(totalDuration) => this.setState({totalDuration})}
              placeholder="Tempo de estudo."
              value={this.state.totalDuration}
              keyboardType='numeric'
            />
            <Text>Selecione o tempo de intervalo de cada Série(em minutos).</Text>
            <TextInput
              style={styles.input}
              onChangeText={(breakDuration) => this.setState({breakDuration})}
              placeholder="Tempo de estudo."
              value={this.state.breakDuration}
              keyboardType='numeric'
            />
            <Text>Selecione o tema estudado.</Text>
            <Picker
                style={styles.input}
                onValueChange={(discipline) => this.setState({discipline})}
                placeholder="Tema"
                selectedValue={this.state.discipline}
              >
                {this.props.disciplines.map(discipline => (
                  <Picker.Item label={discipline.name} value={discipline.id} key={discipline.id} />
                ))} 
              </Picker>

            <Button 
              color="#1a4f94"
              marginBottom={20}
              title='Aplicar mudanças'
              onPress={() => this.applyChange()}
            />
          </View>
        }
      </ScrollView>
    );
  }
}

const handleTimerComplete = (functionChange, sendData) =>  {
  const PushNotification = require('react-native-push-notification');

  PushNotification.configure({
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    requestPermissions: true,
  });
  sendData();
  const result = functionChange();
  
  if (result == 'complite') {
    PushNotification.localNotification({
      message: "Parabens, você terminou seu treino!", 
    });
  }
  else {
    PushNotification.localNotification({
      message: "Tempo de estudos acabou, iniciando intervalo!", 
    });
  }
  
}

const handleTimerCompleteBreak = (functionChange) =>  {
  const PushNotification = require('react-native-push-notification');

  PushNotification.configure({
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    requestPermissions: true,
  });
  functionChange();
  PushNotification.localNotification({
    message: "Descanço acabou, se prepare para voltar aos estudos!", 
  });
}
 
const options = {
  container: {
    backgroundColor: '#2066c0',
    padding: 5,
    borderRadius: 5,
    width: 300,
    margin: 25
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    color: '#FFF',
    marginLeft: 7,
  }
};

const optionsInBreak = {
  container: {
    backgroundColor: '#f0ad4e',
    padding: 5,
    borderRadius: 5,
    width: 300,
    margin: 25
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    color: '#FFF',
    marginLeft: 7,
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25
  },
  input: {
    height: 45, 
    marginBottom: 20
  },
  marginBottom: {
    marginBottom: 20
  },
  cronContainer: {
    alignItems: 'center'
  }
});

const mapStateToProps = state => (
  {
    disciplines: state.DisciplinesReducer.disciplines
  }
);

export default connect(mapStateToProps, { })(CronometerMarker);