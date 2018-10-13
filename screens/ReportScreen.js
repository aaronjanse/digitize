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

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    let {coords} = location;
    let {latitude, longitude} = coords;
    this.setState({latitude, longitude});
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Title"/>
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
