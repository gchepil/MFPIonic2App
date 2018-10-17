/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import {WLAuthorizationManager, WLResourceRequest } from 'react-native-ibm-mobilefirst';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      isReady: false,
    } 

    WLAuthorizationManager.obtainAccessToken("").then(
      (token) => {
        console.log('-->  pingMFP(): Success ', token);
        var resourceRequest = new WLResourceRequest("/adapters/personsRestAdapter/getPersons",
          WLResourceRequest.GET
        );
        resourceRequest.send().then(
          (response) => {
            // alert("Success: " + response.responseText);
            this.setState({ 
              result: response.responseJSON.results.slice(0, 10), 
              isReady: true
            });
          },
          (error) => {
            alert("Failure: " + JSON.stringify(error));
          }
        );
      }, (error) => {
        console.log('-->  pingMFP(): failure ', error);
        alert("Failed to connect to MobileFirst Server");
      });
  }


  render() {
    const {isReady} = this.state;
    if (isReady) 
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native with request to adapter!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        
          <Text style={styles.welcome}>This is the list from adapter</Text>

          <FlatList
            data={this.state.result}
            renderItem={({item}) => <Text>{item.name.first} {item.name.last}</Text>}
          />

        </View>
      );
      return(
        <View style={styles.container}>
          <Text style={styles.welcome}>Starting....</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
