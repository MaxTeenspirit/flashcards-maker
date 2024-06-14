import filesSlice from './filesSlice';

export const dictionarySlice = filesSlice.injectEndpoints({
	endpoints: (builder) => ({
		getVerbData: builder.query({
			query: (letter) => {
				return `dictionary-${letter}.json`;
			},
		}),
	}),
});

export const {useGetVerbDataQuery} = dictionarySlice;
