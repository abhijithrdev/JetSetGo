import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FlightCard from './FlightCard';
import FilterSortPicker from './FilterSortPicker';

const ResultScreen = ({route}) => {
  const {data, origin, destination, seatsAvailable, departureTime} =
    route.params;

  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  let searchResults = data.filter(flight => {
    return (
      flight.origin === origin &&
      flight.destination === destination &&
      flight.seatsAvailable >= seatsAvailable &&
      flight.departureTime >= departureTime &&
      (!filter || flight.airline === filter)
    );
  });

  if (sort === 'price') {
    searchResults = searchResults.sort((a, b) => a.price - b.price);
  } else if (sort === 'price') {
    searchResults = searchResults.sort(
      (a, b) => a.departureTime - b.departureTime,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <FilterSortPicker
          flights={data}
          type="filter"
          onValueChange={handleFilterChange}
        />
        <FilterSortPicker
          flights={data}
          type="sort"
          onValueChange={handleSortChange}
        />
      </View>

      {searchResults.length !== 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({item}) => <FlightCard flight={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Oops! No results found.</Text>
        </View>
      )}
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginBottom: 30,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '70%',
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: 'normal',
    marginVertical: 40,
    color: 'black',
  },
});
