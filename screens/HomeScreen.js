import React, {Component} from 'react';
import { Image,Platform,ScrollView,StyleSheet,Text,TouchableOpacity,View,} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      number: ''
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View>
        <TextInput />
        <TextInput />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
