import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

interface Flight {
  airline: string;
}

interface FilterSortPickerProps {
  flights: Flight[];
  type: 'filter' | 'sort';
  onValueChange: (value: string) => void;
}

const FilterSortPicker = ({
  flights,
  type,
  onValueChange,
}: FilterSortPickerProps) => {
  const [selectedValue, setSelectedValue] = useState(
    type === 'filter' ? '' : 'sort',
  );

  const allAirlines: {[key: string]: boolean} = {};

  flights.forEach(flight => {
    allAirlines[flight.airline] = true;
  });

  const airlines = Object.keys(allAirlines);

  const handleValueChange = (itemValue: string) => {
    setSelectedValue(itemValue);
    onValueChange(itemValue);
  };

  return (
    <View style={styles.container}>
      {type === 'filter' ? (
        <View
          style={[
            styles.pickerContainer,
            {borderTopLeftRadius: 10, borderBottomLeftRadius: 10},
          ]}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            style={styles.picker}
            mode="dropdown">
            <Picker.Item label="Filter by Airline" value={''} />
            {airlines.map(airline => (
              <Picker.Item key={airline} label={airline} value={airline} />
            ))}
          </Picker>
        </View>
      ) : (
        <View
          style={[
            styles.pickerContainer,
            {borderTopRightRadius: 10, borderBottomRightRadius: 10},
          ]}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            style={styles.picker}
            mode="dropdown">
            <Picker.Item label="Sort by" value="" />
            <Picker.Item label="Date" value="date" />
            <Picker.Item label="Price" value="price" />
          </Picker>
        </View>
      )}
    </View>
  );
};

export default FilterSortPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  pickerContainer: {
    height: 60,
    width: '85%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ba9753',
    borderWidth: 0.5,
  },
  picker: {
    height: 50,
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    color: 'black',
  },
});
