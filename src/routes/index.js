import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import DrawerIcon from './DrawerIcon';
import CustomDrawerContentComponent from './CustomDrawerContentComponent';
import DrawerRoutes from './DrawerRoutes';


const DrawerNavigatorConfig = {
  contentOptions: {
    activeTintColor: "#fff",
    activeBackgroundColor: "#002c77",
    inactiveTintColor: "#fff"
  },
  contentComponent: CustomDrawerContentComponent
}

const Drawer = DrawerNavigator(DrawerRoutes, DrawerNavigatorConfig);


export const Routes = StackNavigator({
	Home: { screen: 
		Drawer, 
		navigationOptions: props => ({
  		title: "Luminist",
  		headerLeft: <DrawerIcon {...props} />,
  		headerStyle: {
  			backgroundColor: "#1a4f94"
  		},
  		headerTitleStyle: {
  			color: "#17f085"
  		}
    })
	},
});