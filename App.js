import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.13

import HomeScreen from './src/HomeScreen';
import GameScreen from './src/GameScreen';

export const NavApp = StackNavigator({
  Home: { screen: HomeScreen },
  Game: { screen: GameScreen },
});

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return <NavApp />;
  }
}

