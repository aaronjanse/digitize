import React, {Component} from 'react';
import { StyleSheet,Text,TouchableOpacity, Button, View,TextInput, AsyncStorage} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      number: ''
    }
  }

  handlePress(){
    
  }



  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput value={this.state.name} placeholder="John Smith"/>
        <TextInput value={this.state.number} placeholder="#"/>
        <Button title="Get Started" onPress={this.handlePress}     />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    display: flex,
    justifyContent: center,
    alignItems: center,
    backgroundColor: '#fff',
  },
  input {
    height: 20,
    width: 130,
    border: 1 solid black,
  }

});
