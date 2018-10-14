import React from 'react';
import { Platform, View, StyleSheet, Button, Text, StatusBar } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

import FirebaseManager from './Firebase';

export default class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Map',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Report')}
          title="Report"
          color="#007AFF"
        />
      ),
    };
  };

  state = {
    location: null,
    errorMessage: null,
    db: null,
    markerData: []
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

    var db = FirebaseManager.getInstance().getDB()

    db.collection("reports").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // console.log(doc.id);
          // console.log(doc.data());
          let obj = doc.data()
          this.setState((prevState)=>{
            prevState.markerData.push(obj)
          })
      });
     });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };


  render() {
    let latitude = 0;
    let longitude = 0;
    if (this.state.location) {
      latitude = this.state.location.coords.latitude;
      longitude = this.state.location.coords.longitude;
    }
    if (this.state.errorMessage) {
      console.error(this.state.errorMessage)
    }
    let markers = this.state.markerData.map(({name, description, location, date})=>{
      return <Marker
      coordinate={{latitude: location.latitude,longitude: location.longitude}}
      title='Roadkill'
      description={description}
        />
    })
    return (
      <View style={styles.container}>
         <StatusBar barStyle="default" />
        <MapView
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.15,
            longitudeDelta: 0.121,
          }}
        >
        {markers}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
