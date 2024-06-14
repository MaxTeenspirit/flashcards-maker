import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.BASE_URL;

const fileQuery = fetchBaseQuery({baseUrl});

const filesSlice = createApi({
	baseQuery: fileQuery,
	endpoints: () => ({}),
});

export default filesSlice;
