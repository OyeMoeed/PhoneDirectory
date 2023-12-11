import React from 'react';
import {View, Text, FlatList} from 'react-native';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

const AllContacts: React.FC<{route: {params: {contacts: Contact[]}}}> = ({
  route,
}) => {
  const {contacts} = route.params;

  const renderItem = ({item}: {item: Contact}) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.phoneNumber}</Text>
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
    </View>
  );
};

export default AllContacts;
