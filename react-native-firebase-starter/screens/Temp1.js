import React, { Component } from 'react';
import {  View, Text, Button, TextInput, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export default class Temp1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputData: '',
      name: '',
    }
  }
  
  _handleInput = () => {
    alert(this.state.inputData);
    
    console.log('this.props:');
    console.log(this.props);

    const UserRoot = firebase.database().ref('/users/' + firebase.auth().currentUser.uid);

    const input = this.state.inputData;

    UserRoot.update({
      'name':input
    }).catch((err) => {
      console.log(err);
    })  
  }

  _handleAddClient = () => {
    const newClientRef = firebase.database().ref('/clientList/' + firebase.auth().currentUser.uid);
    const key = newClientRef.push(this.state.name).key;
    console.log(key);
  }

  componentDidMount() {
    console.log('Temp1 Mounted');
    console.log(this);
    console.log(this.props);
  }
  
  render() {
    return (
      <View>
        <Text> Temp1 </Text>
        <TextInput
          style={styles.InputText}
          onChangeText={(inputData) => this.setState({inputData})}
        />
        <Button
          title={'Input Data'}
          onPress={this._handleInput}
        />
        <Text>Client</Text>
        <TextInput
          style={styles.InputText}
          onChangeText={(name) => this.setState({name})}
        />
        <Button
          title={'Add Client'}
          onPress={this._handleAddClient}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  InputText: {
    borderWidth: 2,
    height: 40,
  }
});
