import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

import TopBar from './TopBar';

export default class QuizList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      quizes: [],
      loading: false
    };
  }

  refreshQuizes() {
    this.setState({loading: true});
    axios.get('/api/render_quizes.json')
      .then((response) => {
        this.setState({loading: false, quizes: response.data });
      })
      .catch((error) => {
        this.setState({loading: false});
      });
  }

  componentWillMount() {
    this.refreshQuizes();
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        <TopBar name='Lista de Provas' />
        <View style={styles.section}>

          {this.state.quizes.map(quiz => (
            <TouchableHighlight onPress={() => this.props.navigation.navigate('QuizQuestions', {quiz: quiz})} key={quiz.id} underlayColor='#ddd'>
              <View style={styles.quizcontaioner} >
                <View style={styles.spaceBetween} >
                  <Text style={styles.quiztext} >{quiz.name}</Text>
                  <Image
                    source={require('../images/keyboard-right-arrow-button.png')}
                  />
                </View>
              </View>
            </TouchableHighlight>
          ))} 

        </View>
        <Spinner visible={this.state.loading} textContent={"Carregando..."} textStyle={{color: '#FFF'}} />
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
    marginTop: 15
  },
  quizcontaioner: {
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 70,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  quiztext: {
    color: '#2066c0',
    fontSize: 20
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});