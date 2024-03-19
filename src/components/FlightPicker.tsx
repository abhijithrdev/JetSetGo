import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

interface Flight {
  id: number;
  origin: string;
  destination: string;
}

interface FlightPickerProps {
  type: 'departure' | 'arrival' | 'passenger';
  flights: Flight[];
  onValueChange: (value: string, type: string) => void;
}

const FlightPicker = ({type, flights, onValueChange}: FlightPickerProps) => {
  const uniqueCities: {[key: string]: boolean} = {};

  flights.forEach(flight => {
    if (type === 'departure') {
      uniqueCities[flight.origin] = true;
    } else if (type === 'arrival') {
      uniqueCities[flight.destination] = true;
    }
  });

  const cities = Object.keys(uniqueCities);
  const passengerCounts = Array.from({length: 10}, (_, i) => i + 1);

  const [selectedValue, setSelectedValue] = useState('');

  let options: string[] = [];
  switch (type) {
    case 'departure':
    case 'arrival':
      options = cities;
      break;
    case 'passenger':
      options = passengerCounts.map(count => `${count}`);
      break;
    default:
      break;
  }

  const handleValueChange = (itemValue: string) => {
    setSelectedValue(itemValue);
    onValueChange(itemValue, type);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {type === 'departure' ? 'From' : type === 'arrival' ? 'To' : 'Pax'}
      </Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        style={styles.picker}
        mode="dropdown">
        <Picker.Item label="Select" value="" />
        {options.map(option => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    height: 90,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  label: {
    fontWeight: '300',
    top: 5,
    left: 10,
    color: 'gray',
  },
  picker: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 20,
    color: 'black',
  },
});

export default FlightPicker;
