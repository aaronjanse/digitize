import React, {Component} from 'react';
import { Button, Platform, View, TextInput, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class SettingsScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      description: '',
      location : {
        latitude: '',
        longitude: ''
      }
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Report',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Map')}
          title="Submit"
          color="#0000ff"
        />
      ),
    };
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
        <Button title="Report"/>
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
