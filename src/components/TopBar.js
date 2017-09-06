import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableHighlight
} from 'react-native';

export default TopBar = (props) => {
	return(
		<View style={styles.container} >
      { (props.goBack) &&
          <TouchableHighlight onPress={() => props.goBack()} underlayColor='#ddd' style={styles.absolute}>
            <Image
              source={require('../images/left-pointing-arrow.png')}
              style={styles.arrow}
            />
          </TouchableHighlight>
      }
			<Text style={styles.text} >{props.name}</Text>
		</View>
	);
}


const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#2066c0',
    justifyContent: 'center'
  },
  text: {
  	textAlign: 'center',
    color: '#fff',
    fontSize: 20
  },
  absolute: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 100
  },
  arrow: {
    margin: 15,
  }
});