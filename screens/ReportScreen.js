import React, {Component} from 'react';
import { Text, Button, Platform, View, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

import FirebaseManager from './Firebase';

export default class ReportScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: '',
      location : null,
      name: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Report',
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('Map')}
          title="Cancel"
          color="#007AFF"
        />
      ),
      headerRight: (
        <Button
          onPress={() => {
            let description = navigation.getParam('description')
            let latitude = navigation.getParam('latitude')
            let longitude = navigation.getParam('longitude')
            let name = ''


            const value =  AsyncStorage.getItem('name');
            if (value !== null) {
              name = value
            } else {
              name = 'no name'
            }

            console.log("submitting")

            let db = FirebaseManager.getInstance().getDB()

            db.collection("reports").add({
                description: description,
                location: [latitude, longitude],
                date: new Date(),
                name: name
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                navigation.navigate('Map')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
          }}
          title="Submit"
          color="#007AFF"
        />
      ),
    };
  };

  async componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

    try {
      const name = await AsyncStorage.getItem('name');
    if (value !== null) {
      this.setState({name})
    }
   } catch (error) {
     this.setState({name: 'no author'})
   }

  }

  _getLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let latitude = 0;
    let longitude = 0;
    if (this.state.location) {
      latitude = this.state.location.coords.latitude;
      longitude = this.state.location.coords.longitude;
      this.props.navigation.setParams({latitude})
      this.props.navigation.setParams({longitude})
    }
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} multiline={true} onChangeText={(description) => this.props.navigation.setParams({description})}
            value={this.state.description} placeholder="Description... "/>
        <Text style={{marginLeft: '7.5%'}}> Incident Location </Text>
        <MapView
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}>
              <Marker
          coordinate={{latitude: latitude,longitude: longitude}}
          title='title'
          description='description'
          />
        </MapView>
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
    height: 170,
    width: '85%',
    borderWidth: 2,
    borderColor: '#d14817',
    borderRadius: 4,
    marginBottom: 25,
    padding: 8
  },
  map: {
    width: '85%',
    margin: 'auto',
    height: 400
  }
});
