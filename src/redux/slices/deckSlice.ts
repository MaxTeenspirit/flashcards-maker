import {createSlice} from '@reduxjs/toolkit';

import {IDeckInitialState} from '../types';

const initialState: IDeckInitialState = {
	decks: [{id: 'all', name: 'All cards', cards: []}],
};

export const deckSlice = createSlice({
	name: 'decks',
	initialState,
	reducers: {
		getAllDecks: (state) => {
			return state;
		},
		addDeck: (state, {payload}) => {
			state.decks = [...state.decks, payload];
		},
		addCardToDeck: (state, {payload}) => {
			state.decks = state.decks.map((deck) => {
				if (deck.id === payload.deckId) {
					deck.cards.push(payload.cardId);
				}
				return deck;
			});
		},
		deleteDeck: (state, {payload}) => {
			state.decks = state.decks.filter((deck) => deck.id !== payload.id);
		},
	},
});

export const {getAllDecks, addDeck, addCardToDeck, deleteDeck} = deckSlice.actions;

export default deckSlice.reducer;