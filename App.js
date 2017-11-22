import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'; // 0.16.0
import { Ionicons } from "@expo/vector-icons"; // 5.2.0
import * as Animatable from 'react-native-animatable'; // 1.2.4
import { AppLoading, Audio, Font } from 'expo';

import Assets from "./Assets";

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animatable.Text animation="pulse" iterationCount="infinite" easing="ease-out" duration={590} style={styles.title}>OPERATION MIND GAME</Animatable.Text>
        </View>
        <View style={styles.nav}>
          <TouchableOpacity style={{padding: 10}}>
            <Animatable.View animation="pulse" iterationCount="infinite" easing="ease-out" duration={1000} style={styles.button}>
              <Ionicons style={styles.buttonText}  name="md-arrow-dropright" size={50} color="#26A65B"></Ionicons>
            </Animatable.View>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 10}}>
            <Animatable.View animation="bounceIn" delay={300} style={styles.button}>
              <Ionicons style={styles.buttonText}  name="md-podium" size={50} color="#F9690E"></Ionicons>
            </Animatable.View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.copyright}>Developed by traci12. Some rights reserved.</Text>
        </View>
      </View>
    );
  }
}

export default class App extends Component {
  state = { assetsLoaded: false };
  componentDidMount() {
    this.loadAssetsAsync();
  }
  loadAssetsAsync = async () => {
    try {
      await cacheAssetsAsync({
        files: arrayFromObject(Assets)
      });
    } catch (e) {
      console.warn(
        "There was an error caching assets (see: app.js), perhaps due to a " +
          "network timeout, so we skipped caching. Reload the app to try again."
      );
      console.log(e.message);
    } finally {
      await Font.loadAsync({
        'brain-fish-rush': require('./assets/brainfishrush.ttf'),
      });
      const sound = new Audio.Sound();
      await sound.loadAsync(require('./assets/bgm.mp3'));
      await sound.setIsLoopingAsync(true);
      await sound.playAsync();
      this.setState({ assetsLoaded: true });
    }
  };
  render() {
    return this.state.assetsLoaded ? <HomeScreen /> : <AppLoading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DC3023'
  },
  title: {
    fontSize: 70,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'brain-fish-rush'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  nav: {
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 5,
    width: 70,
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
    color: 'white',
  }
});
