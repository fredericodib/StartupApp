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
import axios from 'axios';

import TopBar from './TopBar';
import QuizQuestionAnswer from './QuizQuestionAnswer';


export default class QuizList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      logquiz: [],
      arrayIndice: 0
    };
  }
  
  _backItem() {
    if (this.state.arrayIndice == 0) {
      this.props.navigation.goBack();
    }
    else {
      var indice = this.state.arrayIndice;
      indice--;
      this.setState({arrayIndice: indice})
    }
  }

  _answerQuestion(choice) {
    var indice = this.state.arrayIndice;
    indice++;
    this.setState({arrayIndice: indice})
  }

  render() {
    const { quiz } = this.props.navigation.state.params
    return (
      <ScrollView style={styles.container}>
        <TopBar name={quiz.name} />
        <View style={styles.section}>
          <QuizQuestionAnswer 
            question={quiz.questions[this.state.arrayIndice]}
            backItem={this._backItem.bind(this)}
            answerQuestion={this._answerQuestion.bind(this)}
          />
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