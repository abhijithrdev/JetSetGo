import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = onValueChange => {
  const [date, setDate] = useState(new Date());

  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  const handleDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setIsCalendarModalVisible(false);
    onValueChange(currentDate.toISOString());
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsCalendarModalVisible(true)}
        style={styles.touchableOpacity}>
        <Text style={styles.headerText}>Departure date</Text>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {isCalendarModalVisible && (
        <DateTimePicker
          value={new Date(date)}
          minimumDate={new Date()}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  touchableOpacity: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    height: 80,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  dateText: {padding: 20, color: 'black'},
  headerText: {fontWeight: '300', top: 5, left: 10, color: 'gray'},
});
