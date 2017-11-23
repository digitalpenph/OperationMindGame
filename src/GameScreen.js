import React, { Component } from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import * as Animatable from 'react-native-animatable'; // 1.2.4
import { Ionicons } from "@expo/vector-icons"; // 5.2.0

export default class App extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: null,
      position: ['1','2','3','4','5','6','7','8','9'],
      operation: ['+', '-', '*'],
      score: 0,
      status: true,
      remainingSeconds : 3 * 60,
      interval : null,
      choices: [0, 0],
      feedback: "TIME'S UP"
    };
  }
  componentWillMount(){
    this.fetchData();
    this.handleStart();
  }
  onRefresh() {
    this.setState({ 
      isFetching: true,
    }, 
    function() { this.fetchData() });
  }
  fetchData() {
    let data = [
      this.generateRandomNumber(),
      this.generateRandomNumber(),
      this.generateRandomNumber(),
      this.generateRandomNumber(),
      this.generateRandomNumber(),
      this.generateRandomNumber(),
      this.generateRandomNumber(),
      this.generateRandomNumber(),
      this.generateRandomNumber(),
      this.generateRandomNumber(),
      this.generateRandomNumber(),
      this.generateRandomNumber()
    ];
    this.setState({
      isFetching: false,
      position: this.shuffle(this.state.position),
      operation: this.shuffle(this.state.operation),
      data: [
          { key: 'a', value: data[0] },
          { key: 'b', value: data[1] },
          { key: 'c', value: data[2] },
          { key: 'd', value: data[3] },
          { key: 'e', value: data[4] },
          { key: 'f', value: data[5] },
          { key: 'g', value: data[6] },
          { key: 'h', value: data[7] },
          { key: 'i', value: data[8] },
          { key: 'j', value: data[9] },
          { key: 'k', value: data[10] },
          { key: 'l', value: data[11] },
        ]
    }, 
    function() { this.makeChoices() });
  }
  shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
  }
  generateRandomNumber=()=> {
    return Math.floor(Math.random() * 11);
  }
  makeChoices() {
    let total = eval(this.state.data[this.state.position[0]].value + this.state.operation[0] + this.state.data[this.state.position[1]].value);
    let choices = [total, this.generateRandomNumber()];
    this.setState({
      choices: this.shuffle(choices)
    });
  }
  handleStart() {
    var ival = setInterval(() => {
      if ((this.state.remainingSeconds > 0) && this.state.countDown) {
        this.setState(prevState => {
          return {remainingSeconds : prevState.remainingSeconds - 1};
        });
      }
    }, 1000);
    this.setState(prevState => {
      return {
        remainingSeconds : prevState.remainingSeconds, 
        countDown : true,
        interval : ival,
      };
    });
  }
  formatRemainingSeconds(remainingSeconds) {
    let numMinutes = Math.floor(remainingSeconds / 60);
    let numSeconds = remainingSeconds % 60;
    let formattedTime = "";

    if (numMinutes.toString().length == 1) {
      formattedTime += '0';
      formattedTime += numMinutes.toString();
    } else {
      formattedTime += numMinutes.toString();
    }

    formattedTime += ":";

    if (numSeconds.toString().length == 1) {
      formattedTime += '0';
      formattedTime += numSeconds.toString();
    } else {
      formattedTime += numSeconds.toString();
    }

    return formattedTime;
  }
  retry() {
    this.fetchData();
    this.setState({
      score: 0,
      status: true,
      remainingSeconds : 3 * 60,
      interval : null,
      feedback: "TIME'S UP"
    });
  }
  checkAnswer(answer) {
    let score = this.state.score;
    let total = eval(this.state.data[this.state.position[0]].value + this.state.operation[0] + this.state.data[this.state.position[1]].value);
    if(total == answer) {
      this.setState({
        score: score += 1
      });
      this.fetchData();
    } else {
      this.setState({
        status: false,
        feedback: 'GAME OVER!'
      });
    }
  }
  renderItem({ item, index }) {
    if(index == this.state.position[0] || index == this.state.position[1]) {
      let number = item.value;
      return <TouchableOpacity>
        <Animatable.View animation="bounceIn" duration={3000} style={styles.tiles}>
          <Text style={styles.tilesText}>{number}</Text>
        </Animatable.View>
      </TouchableOpacity>
    } else if(index == this.state.position[2]) {
      let operator = this.state.operation[0];
      return <TouchableOpacity>
        <Animatable.View animation="bounceIn" duration={3000} style={styles.tiles}>
          <Text style={styles.tilesText}>{operator}</Text>
        </Animatable.View>
      </TouchableOpacity>
    } else {
      return <View animation="bounceIn" duration={1000} style={styles.tilesHidden} />
    }
  }
  render () {
    if(this.formatRemainingSeconds(this.state.remainingSeconds) == '00:00' || !this.state.status) {
      return (
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.score}>{this.state.feedback}</Text>
          <Text style={styles.score}>Score: {this.state.score}</Text>
        </View>
        <View style={styles.nav}>
          <TouchableOpacity onPress={()=>this.retry()} style={{padding: 10}}>
            <Animatable.View animation="pulse" iterationCount="infinite" easing="ease-out" duration={1000} style={styles.button}>
              <Ionicons style={styles.buttonText}  name="md-refresh" size={50} color="#26A65B"></Ionicons>
            </Animatable.View>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 10}}>
            <Animatable.View animation="bounceIn" style={styles.button}>
              <Ionicons style={styles.buttonText}  name="md-podium" size={50} color="#F9690E"></Ionicons>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>  
      );
    }
    if(this.state.status) {
      return (
        <View style={styles.container}>
          <Text style={styles.score}>Score: {this.state.score}</Text>
          <FlatList
            contentContainerStyle={styles.list}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            data={this.state.data}
            numColumns={3}
            renderItem={this.renderItem.bind(this)}
          />
          <View style={styles.nav}>
            <TouchableOpacity onPress={()=>this.checkAnswer(this.state.choices[0])} style={{padding: 10}}>
              <Animatable.View animation="bounceIn" style={styles.button}>
                <Text style={styles.buttonText}>{this.state.choices[0]}</Text>
              </Animatable.View>
            </TouchableOpacity>
            <Animatable.View animation="pulse" iterationCount="infinite" easing="ease-out" duration={1000} style={{padding: 10, justifyContent: 'center'}}>
              <Text style={styles.time}>{this.formatRemainingSeconds(this.state.remainingSeconds)}</Text>
            </Animatable.View>
            <TouchableOpacity onPress={()=>this.checkAnswer(this.state.choices[1])} style={{padding: 10}}>
              <Animatable.View animation="bounceIn" style={styles.button}>
                <Text style={styles.buttonText}>{this.state.choices[1]}</Text>
              </Animatable.View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
     paddingTop: Constants.statusBarHeight
  },
  score: {
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tilesText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF'
  },
  tiles: {
    borderRadius: 10,
    margin: 5,
    width: 80,
    height: 80,
    backgroundColor: '#DC3023',
    justifyContent: 'center',
  },
  tilesHidden: {
    borderRadius: 10,
    margin: 5,
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
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
  time: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  }
});

