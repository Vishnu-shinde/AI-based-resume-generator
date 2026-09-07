import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '../utils/constants';

export const resumeApi = createApi({
  reducerPath: 'resumeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Resume'],
  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    buildResume: builder.mutation({
      query: (payload) => ({
        url: '/api/resume/generate',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [{ type: 'Resume', id: 'LIST' }],
    }),
  }),
});

export const { useBuildResumeMutation } = resumeApi;
