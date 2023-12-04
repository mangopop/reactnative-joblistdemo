import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';


export function JobListScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const statusOptions = [
    { label: 'Created', value: 0 },
    { label: 'Approval Pending', value: 1 },
    // Add other status options here
  ];



  const getJobs = async () => {
    try {
      const response = await fetch('https://qafb-api.sandpit.v2.elogbooks.net/sites/1/jobs', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDE2OTcxMjgsImV4cCI6MTcwMTc4MzUyOCwicm9sZXMiOltdLCJ1c2VybmFtZSI6ImFkbWluIn0.mkzPj7VIYlTwYmydAOFHsoVUd2b0p6EK-Rzb59tIKQwC-7oqqmNJI18WhHf4qm8asQAkXqiAIL3m4Z__GTzqZropQmCeBdztiCQ_WxQqXT0QXSmBnWnlJ__YWH27M7PBkwccFXjNCy0u2OlEwxRi7VBYCNQyirZfSoIBGaOoLCk_dLss72rN8f9ReIM8oLmhTlN7crIGaezs42D3mEnMz005UUzMGDO_hYrjA7pFnF7CKVa1MQLb9Ln8E_f9BRXoYTEOfHv4NrBqFBzUSXkWs4FCjHnmT31KGh71A9DYpYTm4t3VeOWcAgj_MlJ0I-kY_kLrRfyGOZSH5DFBuWZnNEIC7Kt6tkHUX6BZ1FOsRrDtz3BfPgVXVGCBB9SysaX2mHWVW0CP91bv2IK-AA3Ap3z4BbIWgx1Ptu_dGb-NhS_o9mCenFZppy1SW5HNFSDPGFsFkH9nPEsm0V-N7RpZ6jHuu2azjKPiilkLl7ZBGM_ZCpocSgjMIbSOYiPt9cspfzAiWWZTxtTJPAN3EU8ca61b6wU9jEkb9bxyhrX8hpeH4zrRAuCfsKLi40bWxjQgdsmlmr9nvrLGMGIFYArnCzGMTFctBkoYYG--YaPd-Z7SOoVctoMBJreObC_xrd4WRUSCNA0fL7uq6IjiKlAqmtaGIm0cSIqSJCGtAp66zeg', // Replace YOUR_TOKEN_HERE with your actual token
        },
      });
      const json = await response.json();
      setJobs(json.jobs);
      console.log(jobs)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getJobs();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {isLoading ? <Text>Loading...</Text> :
        <FlatList
          data={jobs}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { jobId: item.id })}>
              <Text>{item.summary}</Text>
            </TouchableOpacity>
          )}
        />
      }
    </View>
  );
}
