import React, { Component } from 'react';
import {  View, Text, StyleSheet, Button, TextInput } from 'react-native';

import firebase from 'react-native-firebase';
import { Firebase } from '../config/config';
import { NavigationActions } from 'react-navigation';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
    }
  }
  

  componentDidMount() {
    // only need to initialize on the first run?
    // firebase.initializeApp(Firebase.config);
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log('inside cdm: ');
        console.log(user);
        if(user._user.emailVerified) {
          this.props.navigation.navigate('TabStack'); 
        } else {
          this.props.navigation.navigate('EmailVal');
        } 
        
        // firebase.auth().currentUser.sendEmailVerification();
            
      } else {
        //if I need to do something once signed out
      }
    })
  }
  

  _login = () => {
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        console.log('signed in with:');
        console.log(result);
      })
      .catch((err) => {
        // this.setState({errorMsg: err});
        this.setState({errorMsg: err.message});
      })
    //this.props.navigation.navigate('TabStack');
  }

  _register= () => {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> App Title </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />
        <Button
          title={'Login'}
          onPress={this._login}
        />
        <Button 
          title={'Register'}
          onPress={this._register}
        />
        <Text style={styles.errMsg}>{this.state.errorMsg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textInput: {
      height: 40,
      borderColor: 'black',
      borderWidth: 2,
    },
    errMsg: {
      color: 'red',
    }
});
