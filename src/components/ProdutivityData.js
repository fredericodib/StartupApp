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
import { connect } from 'react-redux';
import { IsLoading } from '../actions/LoadingActions';

import { ArmazenateData, SendData } from '../actions/ProductivityActions';

class ProdutivityData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalQuestions: '',
      correctQuestions: '',
      totalTime: '',
      discipline: '',
    };
  }

  _onlyNumber(text) {
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
      if(!(numbers.indexOf(text[i]) > -1 )) {
        return false
      }
    }
    return true
  }

  _sendProdutivity() {
    const { totalQuestions, correctQuestions, totalTime, discipline } = this.state

    if ((totalQuestions == '') || (correctQuestions == '') || (totalTime == '')) {
      Alert.alert(
        'Todos os campos devem ser preenchidos!'
      );
      return null;
    }

    if ((!this._onlyNumber(totalQuestions)) || (!this._onlyNumber(correctQuestions)) || (!this._onlyNumber(totalTime))) {
      Alert.alert(
        'Os campos so podem conter numeros'
      );
      return null;
    }


    if (Number(totalQuestions) < Number(correctQuestions)) {
      Alert.alert(
        'Total de questões tem que ser maior que nomero de questões acertadas!'
      );
      return null;
    }

    this.props.IsLoading(true);

    let today = new Date();
    let dd = today.getDate();
    let year = today.getFullYear();
    let mm = today.getMonth()+1;
    let dateNow = year + '-' + mm + '-' +  dd

    let data = {
      productivity: {
        total_questions: totalQuestions,
        correct_questions: correctQuestions,
        time_studed: totalTime,
        discipline_id: discipline,
        date: dateNow
      }
    }

    axios.post('/api/produtivity/create.json', data)
      .then((response) => {
        this.props.IsLoading(false);
        this.setState({totalQuestions: '', correctQuestions: '', totalTime: '' });
        Alert.alert(
          'Dados gravados com sucesso!'
        );
      })
      .catch((error) => {
        this.props.IsLoading(false);
        this.setState({totalQuestions: '', correctQuestions: '', totalTime: '' });
        Alert.alert(
          'Ouve um erro ao gravar os dados!',
          'Os dados foram armazenados no despositivo. Quando estiver conectado a internet, clique para manda-los manualmente, ou abra novamente o APP.',
        );
        this.props.ArmazenateData(data);
      });
  }

  componentWillMount() {
    this.setState({discipline: this.props.disciplines[0].id});
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.text} >Informe o total de questões respondidas</Text>
          <TextInput
            style={styles.input, styles.text }
            onChangeText={(totalQuestions) => this.setState({totalQuestions})}
            placeholder="Total de questões"
            value={this.state.totalQuestions}
            keyboardType='numeric'
          />
          <Text style={styles.text} >Informe o total de respostas corretas</Text>
          <TextInput
            style={styles.input, styles.text}
            onChangeText={(correctQuestions) => this.setState({correctQuestions})}
            placeholder="Total de acertos"
            value={this.state.correctQuestions}
            keyboardType='numeric'
          />
          <Text  style={styles.text}  >Informe o tempo total gasto(em minutos)</Text>
          <TextInput
            style={styles.input, styles.text}
            onChangeText={(totalTime) => this.setState({totalTime})}
            placeholder="Tempo estudado"
            value={this.state.totalTime}
            keyboardType='numeric'
          />
          <Text  style={styles.text}  >Selecione a disciplina estudada</Text>
          <Picker
            style={styles.input}
            onValueChange={(discipline) => this.setState({discipline})}
            placeholder="Tema"
            selectedValue={this.state.discipline}
          >
          {this.props.disciplines.map(discipline => (
              <Picker.Item  style={styles.text}  label={discipline.name} value={discipline.id} key={discipline.id} />
          ))} 
          </Picker>
          <Button 
            color="#1a4f94"
            marginBottom={20}
            title='Enviar informações'
            onPress={() => this._sendProdutivity()}
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

export default connect(mapStateToProps, { ArmazenateData, SendData, IsLoading })(ProdutivityData);