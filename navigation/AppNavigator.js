import { createSwitchNavigator, createStackNavigator } from 'react-navigation';


import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';
import ReportScreen from '../screens/ReportScreen';

// import MainTabNavigator from './MainTabNavigator';


const AppStack = createStackNavigator({ Map: MapScreen,
  Report: ReportScreen,
});


export default createSwitchNavigator(
  {
    Main: LoginScreen,
    App: AppStack
  },
  {
    initialRouteName: 'Main',
  }
);