import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RequestScreen from './src/components/RequestScreen';
import ResultScreen from './src/components/ResultScreen';

export type RootStackParamList = {
  RequestScreen: undefined;
  ResultScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RequestScreen">
        <Stack.Screen
          name="RequestScreen"
          component={RequestScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{headerTitle: '', headerStyle: {backgroundColor: '#ba9753'}}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
