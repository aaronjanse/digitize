import React, {Component} from 'react';
import { Alert, StyleSheet,Text,TouchableOpacity, Button, View,TextInput, AsyncStorage} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      number: ''
    }
    this.handlePress = this.handlePress.bind(this)
    this.redirect = this.redirect.bind(this)
  }

  static navigationOptions = {
    header: null,
  };

  async handlePress() {
    let {name, number} = this.state
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('number', number);
      this.redirect()
   } catch (error) {
     console.log(error)
     Alert.alert("error")
   }
  }

  async componentWillMount(){
    try {
      const value = await AsyncStorage.getItem('name');
    if (value !== null) {
      this.redirect()
    }
   } catch (error) {
     console.log(error)
   }
  }

  redirect(){
    this.props.navigation.navigate('MapScreen')
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput value={this.state.name} onChangeText={(name) => this.setState({name})} placeholder="John Smith"/>
        <TextInput value={this.state.number} onChangeText={(number) => this.setState({number})} placeholder="#"/>
        <Button title="Get Started" onPress={this.handlePress}     />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 20,
    width: 130,
  },
  button: {

  }
});
