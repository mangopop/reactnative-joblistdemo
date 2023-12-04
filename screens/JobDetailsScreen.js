import React from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useGetJobByIdQuery, useGetContactsByHrefQuery } from '../store'; // Import the RTK Query hook

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

function ContactsTab({ route }) {
    const { jobDetails } = route.params;
    const href = jobDetails?._links?.contacts?.href;
    const { data: contactsData, error, isLoading } = useGetContactsByHrefQuery(href);

    if (isLoading) return <ActivityIndicator />;
    if (error) return <Text>Error loading contacts: {error.message}</Text>;

    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 10 }}>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Telephone: {item.telephone}</Text>
            {/* Render other contact details */}
        </View>
    );

    return (
        <FlatList
            data={contactsData ? contactsData.contacts : []}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
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
                <Tab.Screen name="Contacts" component={ContactsTab} initialParams={{ jobDetails: jobDetails }} />
            </Tab.Navigator>
        </>
    );
}
