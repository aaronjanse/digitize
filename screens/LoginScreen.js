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

  handlePress() {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
   } catch (error) {
     // Error saving data
   }
  }

  async componentWillMount(){
    try {
      const value = await AsyncStorage.getItem('data');
    if (value !== null) {
      redirect()
    }
   } catch (error) {
     // Error retrieving data
   }
  }

  redirect(){
    this.props.navigation.navigate('MapScreen')
  }

  static navigationOptions = {
    header: null,
  };

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
