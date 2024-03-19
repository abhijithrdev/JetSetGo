import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const FlightCard = ({flight}) => {
  const {
    price,
    origin,
    airline,
    aircraft,
    duration,
    arrivalTime,
    destination,
    flightNumber,
    departureTime,
    seatsAvailable,
  } = flight;

  const formattedArrivalTime = new Date(arrivalTime).toLocaleTimeString();
  const formattedDepartureTime = new Date(departureTime).toLocaleTimeString();
  const formattedDepartureDate = new Date(departureTime).toLocaleDateString();

  return (
    <View style={styles.card}>
      <Image
        source={require('../../android/app/src/main/assets/plane.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.heading}>{`${origin} to ${destination}`}</Text>
        <Text style={styles.heading}>
          {airline} - <Text style={styles.text}>{flightNumber}</Text>
        </Text>

        <Text
          style={
            styles.text
          }>{`Departure Date: ${formattedDepartureDate}`}</Text>
        <Text
          style={
            styles.text
          }>{`Departure Time: ${formattedDepartureTime}`}</Text>
        <Text
          style={styles.text}>{`Arrival Time: ${formattedArrivalTime}`}</Text>
        <Text style={styles.text}>{`Duration: ${duration}`}</Text>
        <Text style={styles.text}>{`Aircraft: ${aircraft}`}</Text>
        <Text style={styles.text}>{`Seats Available: ${seatsAvailable}`}</Text>
        <Text style={styles.heading}>{`Price: ₹${price}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: 140,
    height: 200,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignSelf: 'center',
  },
  details: {
    padding: 10,
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  text: {
    fontSize: 14,
    marginBottom: 3,
    color: 'black',
  },
});

export default FlightCard;
