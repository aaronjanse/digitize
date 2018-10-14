import React, {Component} from 'react';
import { Text, Button, Platform, View, TextInput, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Camera, Constants, Location, Permissions } from 'expo';

import FirebaseManager from './Firebase';

export default class ReportScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: '',
      latitude: 0,
      longitude: 0
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
            let name = navigation.getParam('name')

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
      this.props.navigation.setParams({name})
    }
   } catch (error) {
     this.props.navigation.setParams({name:'no name'})
   }

   const { status } = await Permissions.askAsync(Permissions.CAMERA);
   this.setState({ hasCameraPermission: status === 'granted' });
  }

  _getLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    this.setState({ latitude, longitude });
    this.props.navigation.setParams({latitude})
    this.props.navigation.setParams({longitude})
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      console.error('no camera permission')
    } 
  
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 19}}> Brief Description of Roadkill Incident </Text>
        <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
            </View>
          </Camera>
        <TextInput style={styles.input} multiline={true} onChangeText={(description) => this.props.navigation.setParams({description})}
            value={this.state.description} placeholder="Description... "/>
        <Text style={{marginLeft: '7.5%'}}> Incident Location </Text>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}>
              <Marker
          coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}}
          title='Roadkill Report'
          description='Your current report'
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
    borderWidth: 1,
    borderColor: 'black',
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
