import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import FlightPicker from './FlightPicker';
import DatePicker from './DatePicker';

type RequestScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RequestScreen'
>;

interface RequestScreenProps {
  navigation: RequestScreenNavigationProp;
}

const RequestScreen = ({navigation}: RequestScreenProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [passengerCount, setPassengerCount] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.npoint.io/378e02e8e732bb1ac55b',
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleDepartureChange = (value: string) => {
    setDeparture(value);
  };

  const handleArrivalChange = (value: string) => {
    setArrival(value);
  };

  const handlePassengerCountChange = (value: string) => {
    setPassengerCount(value);
  };

  const handleDepartureDateChange = (value: string) => {
    setDepartureDate(value);
  };

  const handleSearch = () => {
    const searchParams = {
      data: data,
      origin: departure,
      destination: arrival,
      seatsAvailable: passengerCount,
      departureTime: departureDate,
    };

    navigation.navigate('ResultScreen', searchParams);
  };

  const handleTitle = () => {
    if (departure !== '' && arrival !== '' && passengerCount !== '') {
      return 'GO';
    } else if (
      (departure !== '' && arrival !== '' && passengerCount === '') ||
      (departure === '' && arrival !== '' && passengerCount !== '') ||
      (departure !== '' && arrival === '' && passengerCount !== '')
    ) {
      return 'SET';
    } else if (departure !== '' || arrival !== '' || passengerCount !== '') {
      return 'JET';
    } else return 'SEARCH';
  };

  const buttonTitle = handleTitle();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Book Your Flight</Text>

        <FlightPicker
          flights={data}
          type={'departure'}
          onValueChange={handleDepartureChange}
        />
        <FlightPicker
          flights={data}
          type={'arrival'}
          onValueChange={handleArrivalChange}
        />
        <FlightPicker
          flights={data}
          type={'passenger'}
          onValueChange={handlePassengerCountChange}
        />
        <DatePicker onValueChange={handleDepartureDateChange} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          disabled={!(departure && arrival && passengerCount)}
          onPress={handleSearch}
          style={[
            styles.button,
            {
              opacity: buttonTitle == 'GO' ? 1 : 0.5,
            },
          ]}>
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 0.6,
    padding: 20,
    backgroundColor: '#ba9753',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 50,
    color: 'white',
  },
  footer: {
    flex: 0.4,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#ba9753',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    top: 30,
  },
  buttonText: {
    fontSize: 20,
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    opacity: 1,
  },
});
