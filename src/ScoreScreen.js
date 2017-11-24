import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Font } from 'expo';
import * as Animatable from 'react-native-animatable'; // 1.2.4
import { Ionicons } from "@expo/vector-icons"; // 5.2.0
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class App extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      highscore: ''
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      'toyzarux': require('../assets/TOYZARUX.ttf'),
    });
  }
  componentWillMount() {
    this.checkUserScore();
  }
  checkUserScore(){
    AsyncStorage.getItem('score', (err, result) => {
      if (!err && result != null){
        this.setState({
          highscore: result
        });
      }
      else {
        this.setState({
          highscore: 0
        });
      }
    });
  }
  render () {
    const backAction = NavigationActions.back({
      key: null
    })
    return ( 
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.feedback}>Top Score</Text>
          <Text style={styles.score}>{this.state.highscore}</Text>
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
  feedback: {
    fontSize: 40,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'toyzarux'
  },
  score: {
    fontSize: 70,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'toyzarux'
  },
  nav: {
    paddingLeft: 40,
    paddingRight: 40,
    flexDirection: 'row',
    justifyContent: 'center',
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

