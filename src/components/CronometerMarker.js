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
import { connect } from 'react-redux';

import { SetCronometer } from '../actions/CronometerActions';
import TopBar from './TopBar';
import Timer from './Timer';

 
class CronometerMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDuration: 5000,
      breakDuration: 5000,
      numberOfSeries: 1,
      discipline: ''
    };
  }
 
  
  componentWillMount() {
    this.setState({discipline: this.props.disciplines[0].id});
  }

  render() {

    if(this.props.ready) {
      return(
        <View style={styles.section}>
          <TopBar name='Cronometrar' goBack={this.props.navigation.goBack}/>
          <Timer />
        </View>
      );
    }
    return (
      <ScrollView style={styles.section}>
        <TopBar name='Configurar Cronometro' goBack={this.props.navigation.goBack}/>
        <View style={styles.container}>
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
          <Picker
            style={styles.input}
            onValueChange={(totalDuration) => this.setState({totalDuration})}
            placeholder="Tempo de estudos."
            selectedValue={this.state.totalDuration}
          >
            <Picker.Item label="5" value={5 * 1000} />
            <Picker.Item label="10" value={10 * 1000} />
            <Picker.Item label="15" value={15 * 1000} />
            <Picker.Item label="20" value={20 * 1000} />
            <Picker.Item label="30" value={30 * 1000} />
            <Picker.Item label="40" value={40 * 1000} />
            <Picker.Item label="50" value={50 * 1000} />
            <Picker.Item label="60" value={60 * 1000} />
            <Picker.Item label="70" value={70 * 1000} />
            <Picker.Item label="80" value={80 * 1000} />
            <Picker.Item label="90" value={90 * 1000} />
          </Picker>

          <Text>Selecione o tempo de intervalo de cada Série(em minutos).</Text>
          <Picker
            style={styles.input}
            onValueChange={(breakDuration) => this.setState({breakDuration})}
            placeholder="Tempo de descanso."
            selectedValue={this.state.breakDuration}
          >
            <Picker.Item label="5" value={5 * 1000} />
            <Picker.Item label="10" value={10 * 1000} />
            <Picker.Item label="15" value={15 * 1000} />
            <Picker.Item label="20" value={20 * 1000} />
            <Picker.Item label="30" value={30 * 1000} />
            <Picker.Item label="40" value={40 * 1000} />
            <Picker.Item label="50" value={50 * 1000} />
            <Picker.Item label="60" value={60 * 1000} />
            <Picker.Item label="70" value={70 * 1000} />
            <Picker.Item label="80" value={80 * 1000} />
            <Picker.Item label="90" value={90 * 1000} />
          </Picker>

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
            title='Aplicar cronometro'
            onPress={() => this.props.SetCronometer(
              this.state.totalDuration,
              this.state.numberOfSeries,
              this.state.breakDuration,
              this.state.discipline
            )}
          />
        </View>
      </ScrollView>
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
  input: {
    height: 45, 
    marginBottom: 20
  },
  marginBottom: {
    marginBottom: 20,
    color: '#000',
    fontSize: 20,
    textAlign: 'center'
  },
  cronContainer: {
    alignItems: 'center'
  }
});

const mapStateToProps = state => (
  {
    disciplines: state.DisciplinesReducer.disciplines,
    ready: state.CronometerReducer.ready
  }
);

export default connect(mapStateToProps, { SetCronometer })(CronometerMarker);