import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

const PhoneDirectory: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadContacts();
  }, []);

  const saveContact = async () => {
    try {
      const newContact: Contact = {
        id: String(Date.now()),
        name,
        phoneNumber,
      };

      await AsyncStorage.setItem(newContact.id, JSON.stringify(newContact));

      setContacts(prevContacts => [...prevContacts, newContact]);

      setName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const loadContacts = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const savedContacts = await AsyncStorage.multiGet(keys);

      const loadedContacts: Contact[] = savedContacts.map(([key, value]) =>
        JSON.parse(value),
      );

      setContacts(loadedContacts);
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const renderItem = ({item}: {item: Contact}) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.phoneNumber}</Text>
    </View>
  );

  const navigateToContacts = () => {
    navigation.navigate('Contacts', {contacts});
  };

  return (
    <View>
      <Text>Add Contact</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <Button title="Save Contact" onPress={saveContact} />

      <Text>Contacts</Text>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <Button title="Show All Contacts" onPress={navigateToContacts} />
    </View>
  );
};

export default PhoneDirectory;
