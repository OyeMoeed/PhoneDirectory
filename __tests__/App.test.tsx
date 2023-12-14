import 'react-native';
import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';
import PhoneDirectory from '../src/screens/phoneDirectory';

test('renders correctly', () => {
  jest.runAllTimers();
  const tree = renderer.create(<PhoneDirectory />).toJSON();
  expect(tree).toMatchSnapshot();
});
