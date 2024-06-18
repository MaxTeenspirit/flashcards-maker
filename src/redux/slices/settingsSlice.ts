import {createSlice} from '@reduxjs/toolkit';

import {ISettingsInitialState} from '@redux-types';

const initialState: ISettingsInitialState = {
	perfekt: true,
	prateritum: true,
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setPerfekt: (state, {payload}) => {
			state.perfekt = payload;
		},
		setPrateritum: (state, {payload}) => {
			state.prateritum = payload;
		},
	},
});

export const {setPerfekt, setPrateritum} = settingsSlice.actions;

export default settingsSlice.reducer;
