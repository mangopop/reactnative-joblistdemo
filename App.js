import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; // Import the store
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { JobListScreen } from './screens/JobListScreen';
import { JobDetailsScreen } from './screens/JobDetailsScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Jobs" component={JobListScreen} />
          <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
