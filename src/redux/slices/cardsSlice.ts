import {createSlice} from '@reduxjs/toolkit';

import {ICardInitialState, ICard} from '../types';

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
		editCard: (state, {payload}) => {
			const editCardIndex = state.cards.findIndex((card) => card.id === payload.id);

			if (editCardIndex || editCardIndex === 0) {
				state.cards = state.cards.reduce((cards, current, i) => {
					if (i === editCardIndex) {
						const editableCard = state.cards[editCardIndex];

						const changedCard = {
							...editableCard,
							wordType: payload?.wordType || editableCard?.wordType,
							article: payload?.article || editableCard?.article,
							word: payload?.word || editableCard?.word,
							plural: payload?.plural || editableCard?.plural,
							translation: payload?.translation || editableCard?.translation,
							deck: payload?.deck || editableCard?.deck,
						};

						cards.push(changedCard);
					} else {
						cards.push(current);
					}

					return cards;
				}, [] as ICard[]);
			}
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

export const {addCard, setDefaultCardsDeck, editCard, deleteAllCards, deleteCards, deleteCard} = cardsSlice.actions;

export default cardsSlice.reducer;
