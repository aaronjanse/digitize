import React, {Component} from 'react';
import { Alert, StyleSheet,Text,TouchableOpacity, Button, View,TextInput, AsyncStorage} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class LoginScreen extends React.Component {
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
      this.setState({name: '', number: ''})
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
    this.props.navigation.navigate('Map')
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.text}>
            <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 5}}> Welcome to EnviroReport</Text>
            <Text style={{textAlign: 'center'}}> Please enter a few details about you to continue</Text>
          </View>
          <TextInput style={styles.input} value={this.state.name} onChangeText={(name) => this.setState({name})} placeholder="John Smith"/>
          <TextInput style={styles.input} value={this.state.number} onChangeText={(number) => this.setState({number})} placeholder="phone number"/>
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
    marginBottom: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 10,
    height: 35,
    width: 250,
  },
  button: {
    height: 30,
    width: 130,
    marginTop: 30
  },
  text: {
    width: 300,
    marginBottom: 30,
    justifyContent: 'center'
  }
});
