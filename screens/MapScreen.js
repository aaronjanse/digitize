import React from 'react';
import { Image, Platform, View, StyleSheet, Button, Text, StatusBar } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

import FirebaseManager from './Firebase';

export default class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Local Map',
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
      markers = []
      querySnapshot.forEach((doc) => {
          // console.log(doc.id);
          // console.log(doc.data());
          let obj = {id: doc.id, ...doc.data()}
          markers.push(obj)
      });
      this.setState({markerData: markers})
    });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
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
        {this.state.markerData.map(({id, name, description, title, location, date, base64}) => (
          <Marker
            key={id}
            coordinate={{latitude: location[0], longitude: location[1]}}
            image={require('../assets/images/marker.png')}
          >
            <Callout key={id}>
              <View>
                <Text> {title} </Text>
                <Text> Reported by: {name.split('')[0]} on {new Date(date.seconds*1000).toString()}</Text>
                <Text> {description} </Text>
                <Image source={{uri: `data:image/gif;base64,${base64}`}}/>
                </View>
              </Callout>
          </Marker>
        ))}
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
  img: {
    height: 100,
    width: 100
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
