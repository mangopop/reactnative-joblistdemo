import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { JobListScreen } from './screens/JobListScreen';
import { JobDetailsScreen } from './screens/JobDetailsScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Jobs" component={JobListScreen} />
        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
