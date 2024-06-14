import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';

import {ICardInitialState, IDeckInitialState} from '@redux-types';

import cardsReducer from './slices/cardsSlice';
import decksReducer from './slices/deckSlice';
import filesSlice from './slices/filesSlice';

const persistConfig = {
	key: 'root',
	storage: storage('FlashFluentDE'),
	serialize: false,
	deserialize: false,
};

const persistedCardsReducer = persistReducer({...persistConfig, key: 'cards'}, cardsReducer);
const persistedDecksReducer = persistReducer({...persistConfig, key: 'decks'}, decksReducer);

const rootReducer = combineReducers({
	[filesSlice.reducerPath]: filesSlice.reducer, // No need to persist
	cards: persistedCardsReducer,
	decks: persistedDecksReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(filesSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = {
	cards: ICardInitialState;
	decks: IDeckInitialState;
};
