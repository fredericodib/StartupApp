import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Picker,
  Alert,
  TouchableHighlight,
  ScrollView,
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import CronometerMarker from '../components/CronometerMarker';


class CronometerHome extends Component {

  render() {
    return (
    	<View style={styles.container} >

      		<View style={styles.Section} >
      			<TouchableHighlight onPress={() => this.props.navigation.navigate('CronometerMarker')} underlayColor='#1a4f94'>
	      			<View style={styles.blockFullSize} >
	      				<View style={styles.blockTop} >
	      					<Text style={styles.blockTitle} >Cronometrar</Text>
	      				</View>
	      				<View style={styles.blockBottom} >
	      					<Text style={styles.blockDescription} >Marque seu tempo de estudos para os diferentes conteudos.</Text>
	      				</View>
	      			</View>
      			</TouchableHighlight>

      			<TouchableHighlight onPress={() => this.props.navigation.navigate('ProdutivityNavigation')} underlayColor='#1a4f94'>
	      			<View style={styles.blockFullSize} >
	      				<View style={styles.blockTop} >
	      					<Text style={styles.blockTitle} >Histórico</Text>
	      				</View>
	      				<View style={styles.blockBottom} >
	      					<Text style={styles.blockDescription} >Veja o histórico de tempo cronometrado.</Text>
	      				</View>
	      			</View>
      			</TouchableHighlight>
      		</View>

      	</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25
  },
  Section: {
  	flex: 1,
    justifyContent: 'space-between',
    marginBottom: 25,
    marginTop: 25
  },
  title: {
    fontSize: 23,
    color: '#17f085',
    textAlign: 'center'
  },
  titleContainer: {
    backgroundColor: '#1a4f94',
    padding: 6,
    borderRadius: 6,
    marginBottom: 25
  },
  block: {
    width: 170,
    height: 220,
    backgroundColor: '#2066c0',
    borderRadius: 6,
  },
  blockFullSize: {
    height: 220,
    backgroundColor: '#2066c0',
    borderRadius: 6,
  },
  blockTop: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  blockBottom: {
    flex: 2,
    alignItems: 'center',
  },
  blockTitle: {
    fontSize: 18,
    color: '#fff'
  },
  blockDescription: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  },
  icon: {
  	width: 40,
  	height: 40,
  	marginBottom: 5
  },
});

export default CronometerNavigation = StackNavigator({
	CronometerHome: { screen: CronometerHome },
  	CronometerMarker: { screen: CronometerMarker }
}, {
  	headerMode: 'none'
});