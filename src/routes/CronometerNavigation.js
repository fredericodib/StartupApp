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
import CronometerHistoric from '../components/CronometerHistoric';
import TopBar from '../components/TopBar';


class CronometerHome extends Component {

  render() {
    return (
      <View style={styles.panel} >
        <TopBar name='Cronometro' />
      	<View style={styles.container} >

      		<View style={styles.Section} >
      			<TouchableHighlight onPress={() => this.props.navigation.navigate('CronometerMarker')} underlayColor='#1a4f94' style={{flex: 8}} >
	      			<View style={styles.blockFullSize} >
	      				<View style={styles.blockTop} >
	      					<Text style={styles.blockTitle} >Cronometrar</Text>
	      				</View>
	      				<View style={styles.blockBottom} >
	      					<Text style={styles.blockDescription} >Marque seu tempo de estudos para as diferentes disciplinas</Text>
	      				</View>
	      			</View>
      			</TouchableHighlight>

            <View style={{flex: 1}}>
            </View>

      			<TouchableHighlight onPress={() => this.props.navigation.navigate('CronometerHistoric')} underlayColor='#1a4f94' style={{flex: 8}} >
	      			<View style={styles.blockFullSize} >
	      				<View style={styles.blockTop} >
	      					<Text style={styles.blockTitle} >Histórico</Text>
	      				</View>
	      				<View style={styles.blockBottom} >
	      					<Text style={styles.blockDescription} >Veja o histórico de tempo cronometrado</Text>
	      				</View>
	      			</View>
      			</TouchableHighlight>
      		</View>

      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25
  },
  Section: {
  	flex: 1,
    marginBottom: 15,
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
    minHeight: 100,
    flex: 1,
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
  CronometerMarker: { screen: CronometerMarker },
  CronometerHistoric: { screen: CronometerHistoric }
}, {
  	headerMode: 'none'
});