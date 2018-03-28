import React, { Component } from 'react';
import {  View, Text, Button } from 'react-native';

import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';

export default class Setting extends Component {

  _sighOut = () => {
    // alert('trying to sign out (sign out not setup yet)');
    firebase.auth().signOut()
    .then(() => {
      const ResetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
      });
      this.props.navigation.dispatch(ResetAction);  
    }) .catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <View>
        <Text> Setting's Page </Text>
        <Button
          title={'Sign Out'}
          onPress={this._sighOut}
        />
      </View>
    );
  }
}
