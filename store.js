import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://qafb-api.sandpit.v2.elogbooks.net',
    prepareHeaders: (headers, { getState }) => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDE2OTcxMjgsImV4cCI6MTcwMTc4MzUyOCwicm9sZXMiOltdLCJ1c2VybmFtZSI6ImFkbWluIn0.mkzPj7VIYlTwYmydAOFHsoVUd2b0p6EK-Rzb59tIKQwC-7oqqmNJI18WhHf4qm8asQAkXqiAIL3m4Z__GTzqZropQmCeBdztiCQ_WxQqXT0QXSmBnWnlJ__YWH27M7PBkwccFXjNCy0u2OlEwxRi7VBYCNQyirZfSoIBGaOoLCk_dLss72rN8f9ReIM8oLmhTlN7crIGaezs42D3mEnMz005UUzMGDO_hYrjA7pFnF7CKVa1MQLb9Ln8E_f9BRXoYTEOfHv4NrBqFBzUSXkWs4FCjHnmT31KGh71A9DYpYTm4t3VeOWcAgj_MlJ0I-kY_kLrRfyGOZSH5DFBuWZnNEIC7Kt6tkHUX6BZ1FOsRrDtz3BfPgVXVGCBB9SysaX2mHWVW0CP91bv2IK-AA3Ap3z4BbIWgx1Ptu_dGb-NhS_o9mCenFZppy1SW5HNFSDPGFsFkH9nPEsm0V-N7RpZ6jHuu2azjKPiilkLl7ZBGM_ZCpocSgjMIbSOYiPt9cspfzAiWWZTxtTJPAN3EU8ca61b6wU9jEkb9bxyhrX8hpeH4zrRAuCfsKLi40bWxjQgdsmlmr9nvrLGMGIFYArnCzGMTFctBkoYYG--YaPd-Z7SOoVctoMBJreObC_xrd4WRUSCNA0fL7uq6IjiKlAqmtaGIm0cSIqSJCGtAp66zeg';
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => '/sites/1/jobs',
    }),
    getJobById: builder.query({ // Adding a new endpoint for fetching a single job
      query: (id) => `/sites/1/jobs/${id}`,
    }),
    getContactsByHref: builder.query({
      query: (href) => href,
  }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery, useGetContactsByHrefQuery } = jobsApi;

// Create the Redux store
export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
});
