import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ActivityIndicator } from 'react-native';

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
    const [jobDetails, setJobDetails] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getJobDetails = async () => {
        try {
            const response = await fetch(`https://qafb-api.sandpit.v2.elogbooks.net/sites/1/jobs/${jobId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDE2OTcxMjgsImV4cCI6MTcwMTc4MzUyOCwicm9sZXMiOltdLCJ1c2VybmFtZSI6ImFkbWluIn0.mkzPj7VIYlTwYmydAOFHsoVUd2b0p6EK-Rzb59tIKQwC-7oqqmNJI18WhHf4qm8asQAkXqiAIL3m4Z__GTzqZropQmCeBdztiCQ_WxQqXT0QXSmBnWnlJ__YWH27M7PBkwccFXjNCy0u2OlEwxRi7VBYCNQyirZfSoIBGaOoLCk_dLss72rN8f9ReIM8oLmhTlN7crIGaezs42D3mEnMz005UUzMGDO_hYrjA7pFnF7CKVa1MQLb9Ln8E_f9BRXoYTEOfHv4NrBqFBzUSXkWs4FCjHnmT31KGh71A9DYpYTm4t3VeOWcAgj_MlJ0I-kY_kLrRfyGOZSH5DFBuWZnNEIC7Kt6tkHUX6BZ1FOsRrDtz3BfPgVXVGCBB9SysaX2mHWVW0CP91bv2IK-AA3Ap3z4BbIWgx1Ptu_dGb-NhS_o9mCenFZppy1SW5HNFSDPGFsFkH9nPEsm0V-N7RpZ6jHuu2azjKPiilkLl7ZBGM_ZCpocSgjMIbSOYiPt9cspfzAiWWZTxtTJPAN3EU8ca61b6wU9jEkb9bxyhrX8hpeH4zrRAuCfsKLi40bWxjQgdsmlmr9nvrLGMGIFYArnCzGMTFctBkoYYG--YaPd-Z7SOoVctoMBJreObC_xrd4WRUSCNA0fL7uq6IjiKlAqmtaGIm0cSIqSJCGtAp66zeg', // Replace YOUR_TOKEN_HERE with your actual token
                    // Add any other headers your API needs
                },
            });
            const json = await response.json();
            setJobDetails(json); // Assuming the API returns job details directly
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJobDetails();
    }, [jobId]);

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (!jobDetails) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No job details found.</Text>
            </View>
        );
    }


    return (
        <>
            <View style={{ flex: 1, padding: 20 }}>
                <Text>ID: {jobDetails.id}</Text>
                <Text>Summary: {jobDetails.summary}</Text>
                <Text>Description: {jobDetails.description}</Text>
                {/* Add more job details here */}
            </View>

            <Tab.Navigator>
                <Tab.Screen name="Files" component={FilesTab} />
                <Tab.Screen name="Notes" component={NotesTab} />
                <Tab.Screen name="Contacts" component={ContactsTab} />
            </Tab.Navigator>
        </>
    );
}
