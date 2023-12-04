import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useGetJobByIdQuery } from '../store'; // Import the RTK Query hook

const Tab = createBottomTabNavigator();

function FilesTab() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Files</Text>
        </View>
    );
}

function NotesTab() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Notes</Text>
        </View>
    );
}

function ContactsTab() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Contacts</Text>
        </View>
    );
}

export function JobDetailsScreen({ route }) {
    const { jobId } = route.params;
    const { data: jobDetails, error, isLoading } = useGetJobByIdQuery(jobId);

    if (isLoading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;


    return (
        <>
            <View style={{ flex: 1, padding: 20 }}>
                {jobDetails && (
                    <>
                        <Text>ID: {jobDetails.id}</Text>
                        <Text>Summary: {jobDetails.summary}</Text>
                        <Text>Description: {jobDetails.description}</Text>
                        {/* Add more job details here */}
                    </>
                )}
            </View>

            <Tab.Navigator>
                <Tab.Screen name="Files" component={FilesTab} />
                <Tab.Screen name="Notes" component={NotesTab} />
                <Tab.Screen name="Contacts" component={ContactsTab} />
            </Tab.Navigator>
        </>
    );
}
