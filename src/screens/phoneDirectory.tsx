// PhoneDirectory.tsx
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

const PhoneDirectory: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadContacts();
  }, []);

  const saveContact = async (): Promise<void> => {
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

  const editContact = (id: string) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    if (contactToEdit) {
      setName(contactToEdit.name);
      setPhoneNumber(contactToEdit.phoneNumber);
      setEditingContactId(id);
    }
  };

  const saveEditedContact = async (): Promise<void> => {
    try {
      const editedContact: Contact = {
        id: editingContactId!,
        name,
        phoneNumber,
      };

      await AsyncStorage.setItem(
        editedContact.id,
        JSON.stringify(editedContact),
      );

      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === editedContact.id ? editedContact : contact,
        ),
      );

      setName('');
      setPhoneNumber('');
      setEditingContactId(null);
    } catch (error) {
      console.error('Error saving edited contact:', error);
    }
  };

  const deleteContact = async (id: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(id);

      setContacts(prevContacts =>
        prevContacts.filter(contact => contact.id !== id),
      );
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const renderItem = ({item}: {item: Contact}) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.phoneNumber}</Text>
      <Button title="Edit" onPress={() => editContact(item.id)} />
      <Button title="Delete" onPress={() => deleteContact(item.id)} />
    </View>
  );

  return (
    <View>
      <Text>{editingContactId ? 'Edit Contact' : 'Add Contact'}</Text>
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
      {editingContactId ? (
        <Button title="Save Edited Contact" onPress={saveEditedContact} />
      ) : (
        <Button title="Save Contact" onPress={saveContact} />
      )}

      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <Button
        title="Show All Contacts"
        onPress={() => navigation.navigate('AllContacts', {contacts})}
      />
    </View>
  );
};

export default PhoneDirectory;
