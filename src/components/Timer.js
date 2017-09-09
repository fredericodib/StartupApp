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
  Alert,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';

import { ResetTimer, CronometerStart, StopTimer } from '../actions/CronometerActions';
import TopBar from './TopBar';

 
class Timer extends Component {

  timeFormated() {
    let total = this.props.timeRemaining;

    total = new Date(total)
    let minutes = total.getMinutes();
    let seconds = total.getSeconds();
    let hr = total.getHours()-22;

    if (hr > 0){
      minutes = minutes + hr * 60;
    }
    if (minutes < 10){
      minutes = "0" + minutes
    }
    if (seconds < 10){
      seconds = "0" + seconds
    }

    return minutes + ':' + seconds
  }


  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title} >{!this.props.inBreak ? "Hora dos estudos!" : "Descanso"}</Text>
        <Text style={styles.title} >{!this.props.inBreak ? "Tempo restante:" : "Seu novo treino começa em:"}</Text>
        <View style={styles.cronometerSection} >
          <Text style={styles.cronometerNumber} >{this.timeFormated()}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
          { (!this.props.started) && 
            <TouchableHighlight onPress={() => this.props.CronometerStart()} underlayColor='#ddd' >
              <View style={styles.buttonGreen} >
                <Text style={styles.buttonGreenText} >Começar</Text>
              </View>
            </TouchableHighlight>
          }

          { ((this.props.started) && (this.props.stoped)) &&
            <TouchableHighlight onPress={() => this.props.CronometerStart()} underlayColor='#ddd' >
              <View style={styles.buttonGreen} >
                <Text style={styles.buttonGreenText} >Retornar</Text>
              </View>
            </TouchableHighlight>
          }

          { ((this.props.started) && (!this.props.stoped)) &&
            <TouchableHighlight onPress={() => this.props.StopTimer(true)} underlayColor='#ddd' >
              <View style={styles.buttonGreen} >
                <Text style={styles.buttonGreenText} >Pausar</Text>
              </View>
            </TouchableHighlight>
          }

          <TouchableHighlight onPress={() => this.props.ResetTimer()} underlayColor='#ddd' >
            <View style={styles.buttonRed} >
              <Text style={styles.buttonRedText} >Cancelar</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#1a4f94'
  },
  cronometerSection: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 1000,
    borderWidth: 4,
    borderColor: '#17f085',
    marginTop: 25,
    marginBottom: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cronometerNumber: {
    fontSize: 60,
    color: '#1a4f94'
  },
  buttonGreen: {
    width: 150,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17f085'
  },
  buttonGreenText: {
    fontSize: 20,
    color: '#1a4f94'
  },
  buttonRed: {
    width: 150,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9534f'
  },
  buttonRedText: {
    fontSize: 20,
    color: '#fff'
  }
});

const mapStateToProps = state => (
  {
    stoped: state.CronometerReducer.stoped,
    inBreak: state.CronometerReducer.inBreak,
    timeRemaining: state.CronometerReducer.timeRemaining,
    started: state.CronometerReducer.started,
  }
);

export default connect(mapStateToProps, { ResetTimer, CronometerStart, StopTimer })(Timer);