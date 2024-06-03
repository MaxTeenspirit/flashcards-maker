import {createSlice} from '@reduxjs/toolkit';

import {IDeck, IDeckInitialState} from '../types';

const initialState: IDeckInitialState = {
	decks: [{id: 'all', name: 'Слова без стеку', cards: []}],
};

export const deckSlice = createSlice({
	name: 'decks',
	initialState,
	reducers: {
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
		editDeck: (state, {payload}) => {
			const editDeckIndex = state.decks.findIndex((deck) => deck.id === payload.id);
			if (editDeckIndex || editDeckIndex === 0) {
				state.decks = state.decks.reduce((decks, current, i) => {
					if (i === editDeckIndex) {
						const editableDeck = state.decks[editDeckIndex];

						const changedDeck = {
							...editableDeck,
							name: payload.name,
						};

						decks.push(changedDeck);
					} else {
						decks.push(current);
					}

					return decks;
				}, [] as IDeck[]);
			}
		},
		deleteDeck: (state, {payload}) => {
			state.decks = state.decks.filter((deck) => deck.id !== payload.id);
		},
		deleteCardFromDeck: (state, {payload}) => {
			state.decks = state.decks.map((deck) => {
				if (deck.id === payload.id) {
					return {
						...deck,
						cards: deck.cards.filter((cardId) => cardId !== payload.cardId),
					};
				}
				return deck;
			});
		},
	},
});

export const {addDeck, addCardToDeck, editDeck, deleteDeck, deleteCardFromDeck} = deckSlice.actions;

export default deckSlice.reducer;
