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
  Alert
} from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';

import ProdutivityChart from './ProdutivityChart';
import { SendData } from '../actions/ProductivityActions';
import { IsLoading } from '../actions/LoadingActions';

import { connect } from 'react-redux';

class ProdutivityPerformance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      discipline: 'all',
      rengeTime: 'today',
      customRangeBeginning: '',
      customRangeEnd: '',
      chartData: ''
    };
  }

  _getData() {
    const { typeSearch, rengeTime, customRangeBeginning, customRangeEnd, discipline } = this.state

    this.props.IsLoading(true);
    axios.post('/api/produtivity_informations.json', {
      rengeTime: rengeTime,
      customRangeBeginning: customRangeBeginning,
      customRangeEnd: customRangeEnd,
      discipline: discipline
    })
      .then((response) => {
        this.props.IsLoading(false);
        this.setState({chartData: response.data});
      })
      .catch((error) => {
        this.props.IsLoading(false);
        Alert.alert(
          'Não foi possivel se conectar ao servidor!'
        );
      });
  }

  _closeChart() {
    this.setState({chartData: '' });
  }

  render() {

    return (
      <ScrollView style={styles.container} >
        { (this.state.chartData == '') && 
        <View style={styles.section}>

          <View>
            <Text style={styles.text} >Selecione o tema estudado.</Text>
            <Picker
              style={styles.input}
              onValueChange={(discipline) => this.setState({discipline})}
              placeholder="Tema"
              selectedValue={this.state.discipline}
            >
              <Picker.Item label="Todos os temas" value="all" />
              {this.props.disciplines.map(discipline => (
                <Picker.Item label={discipline.name} value={discipline.id} key={discipline.id} />
              ))} 
            </Picker>
          </View>
          
          <Text style={styles.text} >Selecione a faixa de tempo desejada</Text>
          <Picker
            style={styles.input}
            onValueChange={(rengeTime) => this.setState({rengeTime})}
            placeholder="Tema"
            selectedValue={this.state.rengeTime}
          >
            <Picker.Item label="Hoje" value="today" />
            <Picker.Item label="Essa semana" value="week" />
            <Picker.Item label="Esse mês" value="month" />
            <Picker.Item label="Outros" value="custom" />
          </Picker>
          { (this.state.rengeTime == "custom") && 

            <View style={styles.alignCenter} >
              <DatePicker
                style={{width: 200, marginBottom: 20}}
                date={this.state.customRangeBeginning}
                mode="date"
                placeholder="Data de início"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(customRangeBeginning) => this.setState({ customRangeBeginning })}
              />

              <DatePicker
                style={{width: 200, marginBottom: 20}}
                date={this.state.customRangeEnd}
                mode="date"
                placeholder="Data de Termino"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(customRangeEnd) => this.setState({ customRangeEnd })}
              />
            </View>
          }
          <Button 
            color="#1a4f94"
            marginBottom={20}
            title='Montar gráfico'
            onPress={() => this._getData()}
          /> 
          { (this.props.productivityDatas.length > 0) && 
            <TouchableHighlight underlayColor='#ddd' onPress={() => this.props.SendData()}>
              <View>
                <View style={styles.errorSection} >
                  <Text style={styles.errorTitle} >Enviar dados novamente</Text>
                </View>
                <Text>{this.props.productivityDatas.length} dados não enviados.</Text>
              </View>
            </TouchableHighlight>
          }
        </View>
        }
        { (this.state.chartData != '') && 
          <ProdutivityChart data={this.state.chartData} discipline={this.state.discipline} onevent={this._closeChart.bind(this)} />
        }  
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    flex: 1,
    padding: 25
  },
  input: {
    height: 45, 
    marginBottom: 25
  },
  alignCenter: {
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
  },
  errorSection: {
    padding: 25,
    borderWidth: 1,
    borderColor: '#d9534f',
    marginTop: 15,
  },
  errorTitle: {
    color: '#d9534f',
    fontSize: 20,
    textAlign: 'center'
  }
});


const mapStateToProps = state => (
  {
    disciplines: state.DisciplinesReducer.disciplines,
    productivityDatas: state.ProductivityReducer.productivityDatas
  }
);

export default connect(mapStateToProps, { SendData, IsLoading })(ProdutivityPerformance);