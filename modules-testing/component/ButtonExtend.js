import React, { Component } from 'react';
import {  View, Text, Button } from 'react-native';

export default class ButtonExtend extends Component {

  _press = () => {
    console.log('press');
    const input = this.props.input;
    this.props.changeText(input);
  }

  render() {
    return (
      <View>
        <Button
          title={'Change Text'}
          onPress={this._press}
        />
      </View>
    );
  }
}
