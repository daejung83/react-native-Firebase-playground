import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import ButtonExtend from './component/ButtonExtend';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      text: 'i am text',
      input: '',
    }
  }
  
  _changeText = (text) => {
    this.setState({text});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <TextInput
          style={{borderWidth: 2, width: 200}}
          onChangeText={(input) => this.setState({input})}
        />
        <ButtonExtend 
          input={this.state.input} 
          changeText={this._changeText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
