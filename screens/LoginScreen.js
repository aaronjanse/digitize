import React, {Component} from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageBackground } from 'react-native';
import { AppAlert, StyleSheet,Text,TouchableOpacity, View,TextInput, Image, AsyncStorage} from 'react-native';
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
    AsyncStorage.clear();
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
      <ImageBackground style={ styles.container }
                 resizeMode='cover'
                 source={{uri: 'https://images.unsplash.com/photo-1529567186287-3e17bdefa342?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6bae897db75ab4c28184b94b73ccfec0&w=1000&q=80'}}>
        <View style={styles.text}>
          <View style={styles.text}>
            <Text style={{textAlign: 'center', fontSize: 35, color: 'white', marginBottom: 25}}> Welcome to RoadKillAlert</Text>
            <Text style={{textAlign: 'center', fontSize: 25, color: 'white', marginBottom: 0}}> Please enter a few details</Text>
          </View>
          <TextInput style={styles.input} value={this.state.name} onChangeText={(name) => this.setState({name})} placeholder="First Last" placeholderTextColor="white"/>
          <TextInput style={styles.input} value={this.state.number} onChangeText={(number) => this.setState({number})} placeholder="Phone Number" placeholderTextColor="white"/>

          <Button
            icon={
                <Icon
                  name='arrow-right'
                  size={40}
                  color='blue'
                  />
                }
            buttonStyle={{
                backgroundColor: "rgba(92,99,216,1)",
                width: 200,
                height: 45,
                borderColor: "white",
                marginTop: 20,
                borderWidth: 0,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center'
              }}
                title='GET STARTED'
                onPress={this.handlePress}
                />
        </View>
        </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    opacity: 1000,
  },
  input: {
    marginBottom: 15,
    marginTop: 0,
    borderBottomColor: 'rgba(255,255,255, 1)',
    borderBottomWidth: 1.5,
    fontSize: 18,
    color: 'white',
    height: 35,
    width: 260,
  },
  text: {
    width: 300,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
