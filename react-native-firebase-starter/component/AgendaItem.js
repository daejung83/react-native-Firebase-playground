import React, { Component } from 'react';
import {  View, Text, } from 'react-native';

export default class AgendaItem extends Component {
  constructor(props) {
    super(props);
    console.log('AgendaItem:');
    this.state = props.item;
  }
  
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}
