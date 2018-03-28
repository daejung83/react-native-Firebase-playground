import React, { Component } from 'react';
import {  View, Text, Button } from 'react-native';

export default class Menu extends Component {
  render() {
    return (
      <View>
        <Text> SideMenu </Text>
        <Button
          title={'Add Schedule'}
          onPress={this.props.addTime}
        />
      </View>
    );
  }
}
