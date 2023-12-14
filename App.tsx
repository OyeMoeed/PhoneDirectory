import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PhoneDirectory from './src/screens/phoneDirectory';
import AllContacts from './src/screens/AllContacts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const PhoneDirectoryStack = () => {
  return (
    <Stack.Navigator initialRouteName="PhoneDirectory">
      <Stack.Screen name="PhoneDirectory" component={PhoneDirectory} />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="PhoneDirectoryStack"
          component={PhoneDirectoryStack}
        />
        <Tab.Screen name="Contacts" component={AllContacts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
