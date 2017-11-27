import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Font } from 'expo';
import * as Animatable from 'react-native-animatable'; // 1.2.4
import { Ionicons } from "@expo/vector-icons"; // 5.2.0
import { NavigationActions } from 'react-navigation';

export default class App extends Component {
  static navigationOptions = {
    header: null
  };
  async componentDidMount() {
    await Font.loadAsync({
      'toyzarux': require('../assets/TOYZARUX.ttf'),
    });
  }
  render() {
    const backAction = NavigationActions.back({
      key: null
    })
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CREDITS</Text>
        <View style={styles.nav}>
          <Text style={styles.subtitle}>Developer</Text>
          <Text style={styles.paragraph}>Tristan Jake Alcantara</Text>
        </View>
        <View style={styles.nav}>
          <Text style={styles.subtitle}>Music</Text>
          <Text style={styles.paragraph}>melodyloops.com</Text>
        </View>
        <View style={styles.nav}>
          <Text style={styles.subtitle}>Font</Text>
          <Text style={styles.paragraph}>dafont.com</Text>
        </View>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(backAction)} style={{padding: 10}}>
            <Animatable.View animation="pulse" iterationCount="infinite" easing="ease-out" duration={1000} style={styles.button}>
              <Ionicons style={styles.buttonText}  name="md-return-left" size={50} color="#26A65B"></Ionicons>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1EF',
    justifyContent: 'center'
  },
  title: {
    padding: 30,
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'toyzarux'
  },
  subtitle: {
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'toyzarux'
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'toyzarux'
  },
  nav: {
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 40,
    textAlign: 'center',
  },
});

