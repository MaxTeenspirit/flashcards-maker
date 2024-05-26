import {createSlice} from '@reduxjs/toolkit';

import {ICardInitialState} from '../types';

const initialState: ICardInitialState = {
	cards: [],
};

export const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		addCard: (state, {payload}) => {
			state.cards = [...state.cards, payload];
		},
		deleteCard: (state, {payload}) => {
			state.cards = state.cards.filter((card) => card.id !== payload.id);
		},
		deleteAllCards: (state) => {
			state.cards = initialState.cards;
		},
	},
});

export const {addCard, deleteAllCards, deleteCard} = cardsSlice.actions;

export default cardsSlice.reducer;
