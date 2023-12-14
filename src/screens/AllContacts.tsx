// AllContacts.tsx
import React, {useState} from 'react';
import {View, Text, FlatList, Button, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

const AllContacts: React.FC = ({
  route,
}: {
  route: {params: {contacts: Contact[]}};
}) => {
  const {contacts} = route.params;
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');

  const editContact = (id: string) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    if (contactToEdit) {
      setUpdatedName(contactToEdit.name);
      setUpdatedPhoneNumber(contactToEdit.phoneNumber);
      setEditingContactId(id);
    }
  };

  const saveEditedContact = async (id: string): Promise<void> => {
    try {
      const editedContact: Contact = {
        id,
        name: updatedName,
        phoneNumber: updatedPhoneNumber,
      };

      await AsyncStorage.setItem(id, JSON.stringify(editedContact));

      // Update the contacts array with the edited contact
      // (assuming it was passed from PhoneDirectory screen)
      const updatedContacts = contacts.map(contact =>
        contact.id === id ? editedContact : contact,
      );

      setContacts(updatedContacts);

      setUpdatedName('');
      setUpdatedPhoneNumber('');
      setEditingContactId(null);
    } catch (error) {
      console.error('Error saving edited contact:', error);
    }
  };

  const deleteContact = async (id: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(id);

      // Update the contacts array by removing the deleted contact
      // (assuming it was passed from PhoneDirectory screen)
      const updatedContacts = contacts.filter(contact => contact.id !== id);

      setContacts(updatedContacts);
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
      <Text>All Contacts</Text>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {editingContactId && (
        <View>
          <Text>Edit Contact</Text>
          <TextInput
            placeholder="Name"
            value={updatedName}
            onChangeText={text => setUpdatedName(text)}
          />
          <TextInput
            placeholder="Phone Number"
            value={updatedPhoneNumber}
            onChangeText={text => setUpdatedPhoneNumber(text)}
          />
          <Button
            title="Save Edited Contact"
            onPress={() => saveEditedContact(editingContactId)}
          />
        </View>
      )}
    </View>
  );
};

export default AllContacts;
