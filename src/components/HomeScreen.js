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
    	<View style={styles.container} >
    		<View style={styles.titleContainer} >
    			<Text style={styles.title} >Torne seus estudos mais inteligente</Text>
    		</View>

    		<View style={styles.Section} >
    			<TouchableHighlight onPress={() => this.props.navigation.navigate('ProdutivityNavigation')} underlayColor='#1a4f94' style={styles.block}>
      			<View style={styles.block} >
      				<View style={styles.blockTop} >
      					<Image
				          source={require('../images/line-chart.png')}
				          style={styles.icon}
				        />
      					<Text style={styles.blockTitle} >Produtividade</Text>
      				</View>
      				<View style={styles.blockBottom} >
      					<Text style={styles.blockDescription} >Informe seu rendimento e gere gráficos para auxiliá-lo em seus estudos</Text>
      				</View>
      			</View>
    			</TouchableHighlight>

          <View style={{flex: 1}}>
          </View>

    			<TouchableHighlight onPress={() => this.props.navigation.navigate('CronometerNavigation')} underlayColor='#1a4f94' style={styles.block}>
      			<View style={styles.block} >
      				<View style={styles.blockTop} >
      					<Image
				          source={require('../images/stopwatch.png')}
				          style={styles.icon}
				        />
      					<Text style={styles.blockTitle} >Cronometro</Text>
      				</View>
      				<View style={styles.blockBottom} >
      					<Text style={styles.blockDescription} >Marque seu tempo de estudos em cada assunto</Text>
      				</View>
      			</View>
    			</TouchableHighlight>
    		</View>

    		<View style={{flex: 7}}>
    			<TouchableHighlight onPress={() => this.props.navigation.navigate('Profile')} underlayColor='#1a4f94' style={styles.blockFullSize}>
      			<View style={styles.blockFullSize} >
      				<View style={styles.blockTop} >
      					<Image
				          source={require('../images/user.png')}
				          style={styles.icon}
				        />
      					<Text style={styles.blockTitle} >Perfil</Text>
      				</View>
      				<View style={styles.blockBottom} >
      					<Text style={styles.blockDescription} >Confira e edite seus dados</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    flex: 9
  },
  title: {
    fontSize: 23,
    color: '#17f085',
    textAlign: 'center'
  },
  titleContainer: {
    backgroundColor: '#1a4f94',
    borderRadius: 6,
    marginBottom: 25,
    flex: 3,
    justifyContent: 'center',
  },
  block: {
    minWidth: 140,
    minHeight: 160,
    flex: 2,
    backgroundColor: '#2066c0',
    borderRadius: 6,
  },
  blockFullSize: {
    minHeight: 160,
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