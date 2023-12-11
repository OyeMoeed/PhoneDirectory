import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PhoneDirectory from './src/screens/phoneDirectory';
import AllContacts from './src/screens/AllContacts';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PhoneDirectory">
        <Stack.Screen name="PhoneDirectory" component={PhoneDirectory} />
        <Stack.Screen name="Contacts" component={AllContacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
