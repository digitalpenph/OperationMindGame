import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'; // 0.16.0
import { Ionicons } from "@expo/vector-icons"; // 5.2.0
import * as Animatable from 'react-native-animatable'; // 1.2.4
import { AppLoading, Asset, Audio, Font } from 'expo';

import Assets from "./Assets";

export default class App extends Component {
  state = { isLoadingComplete: false };
  static navigationOptions = {
    header: null
  };
  async componentDidMount() {
    const sound = new Audio.Sound();
    await sound.loadAsync(require('../assets/bgm.mp3'));
    await sound.setIsLoopingAsync(true);
    await sound.playAsync();
    this.setState({ assetsLoaded: true });
  }
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/bgm.mp3'),
      ]),
      Font.loadAsync({
        'toyzarux': require('../assets/TOYZARUX.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
  render() {
    const { navigate } = this.props.navigation;
    return !this.state.isLoadingComplete ? <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        /> : 
      (
        <View style={styles.container}>
          <View style={styles.header}>
            <Animatable.Text animation="pulse" iterationCount="infinite" easing="ease-out" duration={490} style={styles.title}>OPERATION MIND GAME</Animatable.Text>
          </View>
          <View style={styles.nav}>
            <View style={styles.section}>
            <TouchableOpacity onPress={() => navigate('Game')} style={{padding: 10}}>
              <Animatable.View animation="pulse" iterationCount="infinite" easing="ease-out" duration={1000} style={styles.button}>
                <Ionicons style={styles.buttonText}  name="md-arrow-dropright" size={50} color="#26A65B"></Ionicons>
              </Animatable.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Score')} style={{padding: 10}}>
              <Animatable.View animation="bounceIn" style={styles.button}>
                <Ionicons style={styles.buttonText}  name="md-podium" size={50} color="#F9690E"></Ionicons>
              </Animatable.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Credit')} style={{padding: 10}}>
              <Animatable.View animation="bounceIn" style={styles.button}>
                <Ionicons style={styles.buttonText}  name="md-person" size={50} color="#000000"></Ionicons>
              </Animatable.View>
            </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.copyright}>Some rights reserved. Developed by traci12.</Text>
          </View>
        </View>
      );
    ;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F2F1EF'
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'toyzarux'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  nav: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
    borderColor: '#383838', 
    borderWidth: 2
  },
  buttonText: {
    fontWeight: 'bold',
  },
  copyright: {
    paddingBottom: 10,
    textAlign: 'center',
    color: 'black',
  }
});
