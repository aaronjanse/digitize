import React, {Component} from 'react';
import { View, TextInput, Platform, View, StyleSheet } from 'react-native';

export default class SettingsScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      description: '',
      location : {
        latitude: ''
        longitude: ''
      }
    }
  }

  static navigationOptions = {
    title: 'Create Report',
  };

  state = {
    description: ''
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <TextInput value={this.state.description} placeholder="Description"/>
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
