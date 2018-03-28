import React, { Component } from 'react';
import {  View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-elements';

const NumMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

export default class Schedule extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      datePickerState: false,
      timePickerState: false,
      date: new Date(),
    }
  }

  _handleDatePicked = (date) => {
    console.log(date);
    this.setState({date});
    this._hideDatePicker();
  }

  _hideDatePicker = () => {
    this.setState({datePickerState: false});
  }

  _showDatePicker = () => {
    this.setState({datePickerState: true});
  }

  _handleTimePicked = (date) => {
    console.log(date);
    this.setState({date});
    this._hideTimePicker();
  }

  _hideTimePicker = () => {
    this.setState({timePickerState: false});
  }

  _showTimePicker = () => {
    this.setState({timePickerState: true});
  }

  _handleConfirm = () => {
    const date = this.state.date;
    let day = date.getFullYear() + '-' + NumMonths[date.getMonth()] + '-' + date.getUTCDate();
    console.log(day);
    this.props.addSchedule(day.toString(), {text: 'checking Confirm'});
    this.props.closeWindow();
  }

  render() {
    return (
      <View style={styles.modal}>
        <Text>Scheduled Time:</Text>
        <Text>{this.state.date.toString()}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{this.state.date.toLocaleDateString()}</Text>
          <Icon
            name='date-range'
            onPress={this._showDatePicker}
          />
        </View>
        
        <View style={{flexDirection: 'row'}}>
          <Text>{this.state.date.toLocaleTimeString()}</Text>
          <Icon
            name='access-time'
            onPress={this._showTimePicker}
          />
        </View>

        <Text>{this.state.date.toLocaleString()}</Text>

        <DateTimePicker
          isVisible={this.state.datePickerState}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDatePicker}
          mode={'date'}
          date={this.state.date}
        />

        <DateTimePicker
          isVisible={this.state.timePickerState}
          onConfirm={this._handleTimePicked}
          onCancel={this._hideTimePicker}
          mode={'time'}
          date={this.state.date}
        />

        <Button
          title={'Confirm'}
          onPress={this._handleConfirm}
        />

        <Button
          title={'exit'}
          onPress={this.props.closeWindow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    borderWidth: 2,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});