import React, { Component } from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';

import HomeScreen from '../components/HomeScreen';
import Logout from '../components/Logout';
import Profile from '../components/Profile';
import QuizNavigation from './QuizNavigation';
import ProdutivityNavigation from './ProdutivityNavigation';
import CronometerNavigation from './CronometerNavigation';


export default DrawerRoutes = {
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../images/home.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    })
  },

  //QuizNavigation: {
  //  screen: QuizNavigation,
  //  navigationOptions: () => ({
  //    drawerLabel: 'Lista de provas',
  //    drawerIcon: ({ tintColor }) => (
  //      <Image
  //        source={require('../images/edit.png')}
  //        style={[styles.icon, {tintColor: tintColor}]}
  //      />
  //    ),
  //  })
  //},

  ProdutivityNavigation: {
    screen: ProdutivityNavigation,
    navigationOptions: () => ({
      drawerLabel: 'Produtividade',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../images/line-chart.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    })
  },

  CronometerNavigation: {
    screen: CronometerNavigation,
    navigationOptions: () => ({
      drawerLabel: 'Cronometro',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../images/stopwatch.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    })
  },

  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      drawerLabel: 'Perfil',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../images/user.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    })
  },

  Logout: {
    screen: Logout,
    navigationOptions: () => ({
      drawerLabel: 'Sair',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../images/exit.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    })
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  }
});

