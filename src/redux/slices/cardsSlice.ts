import {createSlice} from '@reduxjs/toolkit';

import {IInitialState} from '../types';

const initialState: IInitialState = {
	cards: [],
};

export const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		getAllCards: (state) => {
			return state;
		},
		addCard: (state, {payload}) => {
			state.cards = [...state.cards, payload];
		},
		deleteAllCards: (state) => {
			state.cards = initialState.cards;
		},
	},
});

export const {getAllCards, addCard, deleteAllCards} = cardsSlice.actions;

export default cardsSlice.reducer;
