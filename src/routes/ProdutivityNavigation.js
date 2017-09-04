import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import ProdutivityData from '../components/ProdutivityData';
import ProdutivityPerformance from '../components/ProdutivityPerformance';



export default ProdutivityNavigation = TabNavigator({
	ProdutivityPerformance: { 
    screen: ProdutivityPerformance,
    navigationOptions: ({navigation}) => ({
      title: 'Gerar relatório',
    }),
  },
  ProdutivityData: { 
    screen: ProdutivityData,
    navigationOptions: ({navigation}) => ({
      title: 'Enviar dados',
    }),
  }
}, {
  	tabBarOptions: {
      style: {
        backgroundColor: '#2066c0'
      }
    }
});

