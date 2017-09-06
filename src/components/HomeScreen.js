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


export default class HomeScreen extends Component {

  render() {
    return (
    	<ScrollView style={styles.container} >
    		<View style={styles.titleContainer} >
      			<Text style={styles.title} >Torne seus estudos mais inteligente</Text>
      		</View>

      		<View style={styles.Section} >
      			<TouchableHighlight onPress={() => this.props.navigation.navigate('ProdutivityNavigation')} underlayColor='#1a4f94'>
	      			<View style={styles.block} >
	      				<View style={styles.blockTop} >
	      					<Image
					          source={require('../images/line-chart.png')}
					          style={styles.icon}
					        />
	      					<Text style={styles.blockTitle} >Produtividade</Text>
	      				</View>
	      				<View style={styles.blockBottom} >
	      					<Text style={styles.blockDescription} >Informe seu rendimento e gera gráficos para te auxiliar em seus estudos.</Text>
	      				</View>
	      			</View>
      			</TouchableHighlight>

      			<TouchableHighlight onPress={() => this.props.navigation.navigate('CronometerNavigation')} underlayColor='#1a4f94'>
	      			<View style={styles.block} >
	      				<View style={styles.blockTop} >
	      					<Image
					          source={require('../images/stopwatch.png')}
					          style={styles.icon}
					        />
	      					<Text style={styles.blockTitle} >Cronometro</Text>
	      				</View>
	      				<View style={styles.blockBottom} >
	      					<Text style={styles.blockDescription} >Marque seu tempo de estudos em cada assunto para um maior embasamento.</Text>
	      				</View>
	      			</View>
      			</TouchableHighlight>
      		</View>

      		<View>
      			<TouchableHighlight onPress={() => this.props.navigation.navigate('Profile')} underlayColor='#1a4f94'>
	      			<View style={styles.blockFullSize} >
	      				<View style={styles.blockTop} >
	      					<Image
					          source={require('../images/user.png')}
					          style={styles.icon}
					        />
	      					<Text style={styles.blockTitle} >Perfil</Text>
	      				</View>
	      				<View style={styles.blockBottom} >
	      					<Text style={styles.blockDescription} >Confira e edite seus dados.</Text>
	      				</View>
	      			</View>
      			</TouchableHighlight>
      		</View>

      	</ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25
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
  	flex: 1,
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