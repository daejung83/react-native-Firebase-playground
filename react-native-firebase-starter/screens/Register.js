import React, { Component } from 'react';
import {  View, Text, Button, TextInput, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export default class Register extends Component {

  constructor(props, context) {
    super(props, context);
    
    this.state = {
      errorMsg: '',
      email1: '',
      email2: '',
      password: '',
    }
  }
  

  _signUp = () => {
    if(this.state.email1 === this.state.email2) {
      console.log('signup');
      console.log(this.state.email1);
      console.log(this.state.password);
      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
        this.state.email1,
        this.state.password
      )
      .then((result) => {
        console.log('result: ');
        console.log(result);
        console.log(result.user._user);
        console.log(result.user._user.uid);
        // let UserRef = firebase.database().ref('users');
        // UserRef.push(result.user._user.uid);
      })
      .catch((err) => {
        this.setState({errorMsg: err.message});
      })
    } else {
      this.setState({errorMsg: 'emails needs to match'});
    }
    console.log('exiting signup');
  }

  _cancel = () => {
    this.props.navigation.goBack(null);
  }

  render() {
    return (
      <View>
        <Text> Register Page </Text>
        <Text>Email</Text>
        <TextInput
          style={styles.TextBox}
          onChangeText={(email1) => (this.setState({email1}))}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />
        <Text>Re-type Email</Text>
        <TextInput
          style={styles.TextBox}
          onChangeText={(email2) => this.setState({email2})}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.TextBox}
          onChangeText={(password) => this.setState({password})}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />
        <Button
          title={'Sign Up'}
          onPress={this._signUp}
        />
        <Button
          title={'Cancel'}
          onPress={this._cancel}
        />
        <Text style={styles.ErrMsg}>{this.state.errorMsg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextBox: {
    height: 40,
    borderWidth: 2,
  },
  ErrMsg: {
    color: 'red',
  }
});