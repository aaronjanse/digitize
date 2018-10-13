import React from 'react';
import { SwitchNavigator, StackNavigator } from 'react-navigation';


import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';
import ReportScreen from '../screens/ReportScreen';

// import MainTabNavigator from './MainTabNavigator';


const AppStack = StackNavigator({ Map: MapScreen,
  Report: ReportScreen,
});


export default SwitchNavigator(
  {
    Main: LoginScreen,
    App: AppStack
  },
  {
    initialRouteName: 'Main',
  }
);