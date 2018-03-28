import React, { Component } from 'react';
import {  View, Text, Button, StyleSheet, TextInput } from 'react-native';
import firebase from 'react-native-firebase';

export default class EmailVal extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      errorMsg: '',
      email: '',
      password: '',
    }
  }
  
  componentDidMount() {
    firebase.auth().currentUser.sendEmailVerification();
  }

  _resendEmailVerification = () => {
    console.log('sendEmailVerification!');
    firebase.auth().currentUser.sendEmailVerification();
  }

  _checkVerification = () => {
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(
      this.state.email,
      this.state.password
    ).then((result) => {
      console.log(result);
      if(result.user._user.emailVerified) {
        //add user here
        firebase.database().ref('users').child(result.user._user.uid).set({
          email: result.user._user.email
        });

        this.props.navigation.navigate('TabStack');
      } else {
        this.setState({errorMsg: 'email not verified'})
      }
    }).catch((err) => {
      console.error(err);
    })
  }

  render() {
    return (
      <View>
        <Text> Email Verify Page </Text>
        <Text> Email has been send! </Text>
        <TextInput 
          style={styles.inputBox}
          placeholder={'email'}
          keyboardType={'email-address'}
          onChangeText={(email) => this.setState({email})}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={'password'}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          autoCapitalize={'none'}
        />
        <Button
          title={'Re-Send Email Verification'}
          onPress={this._resendEmailVerification}
        />
        <Button
          title={'Check Verification'}
          onPress={this._checkVerification}
        />
        <Text style={styles.ErrMsg}>{this.state.errorMsg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  ErrMsg: {
    color: 'red',
  },
  inputBox: {
    borderWidth: 2,
    height: 40
  }
});
