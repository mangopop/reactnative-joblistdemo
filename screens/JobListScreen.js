import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useGetJobsQuery } from '../store'; // Import the RTK Query hook

export function JobListScreen({ navigation }) {
  const { data, error, isLoading } = useGetJobsQuery();
  const jobs = data?.jobs; // Adjust this line according to your actual API response

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={jobs}
        keyExtractor={({ id }, index) => id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { jobId: item.id })}>
            <Text>{item.summary}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
