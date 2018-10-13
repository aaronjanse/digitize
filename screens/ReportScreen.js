import React, {Component} from 'react';
import { Button, Platform, View, TextInput, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDhPkHYe62XDScfsbTp3ifP910YK32rGhA",
  authDomain: "digitize-hackathon.firebaseapp.com",
  databaseURL: "https://digitize-hackathon.firebaseio.com",
  projectId: "digitize-hackathon",
  storageBucket: "digitize-hackathon.appspot.com",
  messagingSenderId: "328433288607"
};

export default class ReportScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: '',
      location : null
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
            var description = navigation.getParam('description')
            var latitude = 0;
            var longitude = 0;

            console.log("sumbitting")
          
            var app = firebase.initializeApp(firebaseConfig)
            var db = app.firestore()

            db.settings({ timestampsInSnapshots: true }) // fix deprecation error
          
            db.collection("reports").add({
                description: description,
                location: [latitude, longitude],
                date: new Date(),
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
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    var latitude = 0;
    var longitude = 0;
    if (this.state.location) {
      latitude = this.state.location.coords.latitude;
      longitude = this.state.location.coords.longitude;
    }
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} multiline={true} onChangeText={(description) => this.props.navigation.setParams({description})}
            value={this.state.description} placeholder="Description... "/>
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
    marginBottom: 25
  },
  map: {
    width: '85%',
    margin: 'auto',
    height: 400
  }
});
