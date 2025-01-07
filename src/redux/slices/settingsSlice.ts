import {createSlice} from '@reduxjs/toolkit';

import {ISettingsInitialState} from '@redux-types';

const initialState: ISettingsInitialState = {
	perfekt: true,
	prateritum: true,
	presetA12: false,
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
		setA12: (state, {payload}) => {
			state.presetA12 = payload;
		},
	},
});

export const {setPerfekt, setPrateritum, setA12} = settingsSlice.actions;

export default settingsSlice.reducer;
