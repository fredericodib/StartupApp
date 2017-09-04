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

export default class QuizQuestionAnswer extends Component {

  render() {
    const { question } = this.props

    if (question == undefined) {
      return(
        <ScrollView style={styles.container}>
        
          <Button 
              color="#1a4f94"
              title='Enviar respostas'
              onPress={() => null}
          />

          <TouchableHighlight style={styles.goBack} underlayColor='#ddd' onPress={() => this.props.backItem()}>
            <View style={styles.row} >
              <Image
                source={require('../images/left-arrow.png')}
              />
              <Text > Voltar Item</Text>
            </View>
          </TouchableHighlight>

        </ScrollView>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Questão numero: {question.number}</Text>

        <View style={styles.answerBox} >
          {question.choices.map(choice => (
            <TouchableHighlight key={choice.id} style={styles.marginBottom} underlayColor='#ddd' onPress={() => this.props.answerQuestion(choice)}>
              <Text style={styles.answer} >{choice.text}</Text>
            </TouchableHighlight>
          ))}
          <TouchableHighlight underlayColor='#ddd' style={styles.marginBottom} onPress={() => this.props.answerQuestion('jump')}>
            <Text style={styles.answer} >Pular</Text>
          </TouchableHighlight>
        </View>

        <TouchableHighlight style={styles.goBack} underlayColor='#ddd' onPress={() => this.props.backItem()}>
          <View style={styles.row} >
            <Image
              source={require('../images/left-arrow.png')}
            />
            <Text > Voltar Item</Text>
          </View>
        </TouchableHighlight>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
    backgroundColor: '#8f36a2',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10
  },
  answerBox: {
    alignItems: 'center',
    padding: 15,
    borderColor: '#8f36a2',
    borderWidth: 2,
    margin: 25
  },
  answer: {
    textAlign: 'center',
    fontSize: 20,
    color: '#002c77',
    backgroundColor: '#17f085',
    padding: 10,
    borderRadius: 5,
    width: 200
  },
  row: {
    flexDirection: 'row'
  },
  goBack: {
    marginLeft: 25,
    width: 120,
    marginBottom: 15
  },
  marginBottom: {
    marginBottom: 25
  }
});