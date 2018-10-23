/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import {WLAuthorizationManager, WLResourceRequest } from 'react-native-ibm-mobilefirst';

type Props = {};

const window = Dimensions.get('window');

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

          <SortableList
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={this.state.result}
            onActivateRow={this.testf}
            renderRow={this._renderRow} />

        </View>
      );
      return(
        <View style={styles.container}>
          <Text style={styles.welcome}>Starting....</Text>
        </View>
      );
  }

  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }

  testf = (key) => {
    console.log(key);
  }
}

class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1.5],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
   const {data, active} = this.props;

    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        <Image source={{uri: data.picture.thumbnail}} style={styles.image} />
        <Text style={styles.text}>{data.name.first} {data.name.last}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },
  
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,


    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },

  text: {
    fontSize: 24,
    color: '#222222',
  },
});
