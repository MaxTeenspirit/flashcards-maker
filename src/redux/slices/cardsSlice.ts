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
		setDefaultCardsDeck: (state, {payload}) => {
			state.cards = state.cards.map((card) => {
				if (card.deck === payload.deckId) {
					return {...card, deck: 'all'};
				}
				return card;
			});
		},
		deleteCard: (state, {payload}) => {
			state.cards = state.cards.filter((card) => card.id !== payload.id);
		},
		deleteCards: (state, {payload}) => {
			state.cards = state.cards.filter((card) => !payload.cards.includes(card.id));
		},
		deleteAllCards: (state) => {
			state.cards = initialState.cards;
		},
	},
});

export const {addCard, setDefaultCardsDeck, deleteAllCards, deleteCards, deleteCard} = cardsSlice.actions;

export default cardsSlice.reducer;
