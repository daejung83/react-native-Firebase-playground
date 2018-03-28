import React, { Component } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import datetime from 'node-datetime';
import SideMenu from 'react-native-side-menu';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Divider, Avatar, ListItem } from 'react-native-elements';

import AgendaItem from '../component/AgendaItem';

/**
 * Docs:
 * https://github.com/wix/react-native-calendars
 */
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import Menu from '../component/Menu';
import Schedule from '../component/Schedule';

/**
 * temp database
 * TODO: This will need to be linked to a database later
 */
let dates = {
  '2018-04-10': [{text: 'testing date order'}],
  '2018-03-22': [{text: 'item 1 - any js object'}],
  '2018-03-23': [{text: 'item 2 - any js object'}],
  '2018-03-24': [],
  '2018-03-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
      };

export default class Temp2 extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      
      modalState: false,
      datePickerState: false,
    }
  }

  testing = () => {
    this._handleAddDate('2018-03-20', {text: 'testing info'})
  }

  _handleAddDate = (date, info) => {
    /**
     * TODO: link database here
     */
    if(dates[date] === undefined) {
      dates[date] = [{info}];
    } else {
      dates[date].push(info);

    }
    this.setState({});
    console.log(dates[date]);
  }
  
  _handleAddTime = () => {
    this.setState({modalState: true});
  }

  _handleRenderItem = (item, firstItemInDay) => {

    if(firstItemInDay){
      return (
        <View style={{
          borderWidth: 2, 
          alignItems: 'flex-end',
          marginBottom: 20,
        }}>
          <ListItem
            avatar={
              <Avatar
                rounded
                title={'TM'}
              />}
            title={item.text}
            subtitle={'SubTitle'}
            containerStyle={{alignSelf: 'stretch'}}
          />
        </View>
      );
    } else {
      return (
        <View style={{
          borderWidth: 2,
          alignItems: 'flex-end',
          marginLeft: 50,
          marginBottom: 20,
          flex: 1
        }}>
          <ListItem
            avatar={
              <Avatar
                rounded
                title={'TM'}
              />}
            title={item.text}
            subtitle={'SubTitle'}
            containerStyle={{alignSelf: 'stretch'}}
          />
        </View>
      );
    }
  }

  _handleRenderDay = (day, item) => {
    console.log('handleRenderDay');
    console.log(day);
    console.log(item);


    if(day) {
      const monthColor = day.month % 2 ? 'blue' : 'red';
      return (
        <View style={{
          width: 50,
          alignItems: 'center',
        }}>
          <Avatar
            title={String(day.day)}
            rounded
            overlayContainerStyle={{backgroundColor: monthColor}}
          />
          <Text>{day.month + '-' + day.year}</Text>
        </View>
      );
    } else {
      return (<View />);
    }
  }

  _handleDayPress = (day) => {
    // console.log('handleDayPress');
    // console.log(day);
    // console.log(this.state);
    // console.log('before setState');
    // this.setState({buttonState: true})
  }

  _hideScheduleWindow = () => {
    this.setState({modalState: false});
    console.log(dates);
  }

  _handleDatePicked = (day) => {
    console.log(day.getDate());
    this._hideDatePicker();
  }

  render() {

  /**
   * Side slide Menu
   */
  const menu =  <Menu
                  addTime={this._handleAddTime}
                />;

    return (
      <SideMenu menu={menu}>
        <View style={{flex:1}}>
          
          {/* 
            Modal to add schedule to calendar
           */}
          <Modal
            visible={this.state.modalState}
            animationType={'slide'}
            transparent={true}
          >
            <Schedule 
              closeWindow={this._hideScheduleWindow}
              addSchedule={this._handleAddDate}
            />
            
          </Modal>
          
          <Agenda
            items={dates}
            // specify how each item should be rendered in agenda
            // callback that gets called when items for a certain month should be loaded (month became visible)
            // loadItemsForMonth={(month) => {console.log('trigger items loading')}}
            // callback that fires when the calendar is opened or closed
            // onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
            //render Each item
            renderItem={this._handleRenderItem}
            // specify how each date should be rendered. day can be undefined if the item is not first in that day.
            renderDay={this._handleRenderDay}
            // specify how empty date content with no items should be rendered
            // renderEmptyDate={() => {return (<View><Text>EmptyDate</Text></View>);}}
            renderEmptyDate={() => {return (<View style={{borderWidth: 2}}/>)}}
            // specify how agenda knob should look like
            renderKnob={() => {return (<View><Text>huh?</Text></View>);}}
            // specify what should be rendered instead of ActivityIndicator
            renderEmptyData = {() => {return (<View/>);}}
            // specify your item comparison function for increased performance
            rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
            //theme styles
            onDayPress={this._handleDayPress}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              monthTextColor: 'blue',
              // textDayFontFamily: 'monospace',
              // textMonthFontFamily: 'monospace',
              // textDayHeaderFontFamily: 'monospace',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
              agendaDayTextColor: 'yellow',
              agendaDayNumColor: 'green',
              agendaTodayColor: 'red',
              agendaKnobColor: 'blue'
            }}
          />
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  
});
