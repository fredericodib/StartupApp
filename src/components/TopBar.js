import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';

export default TopBar = (props) => {
	return(
		<View style={styles.container} >
			<Text style={styles.text} >{props.name}</Text>
		</View>
	);
}


const styles = StyleSheet.create({
  container: {
    height: 25,
    backgroundColor: '#2066c0',
    padding: 25,
    justifyContent: 'center'
  },
  text: {
  	textAlign: 'center',
    color: '#fff',
    fontSize: 20
  }
});