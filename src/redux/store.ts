import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';

import cardsReducer from './slices/cardsSlice';

const rootReducer = combineReducers({
	cards: cardsReducer,
});

const persistConfig = {
	key: 'root',
	storage: storage('FlashFluentDE'),
	serialize: false, // Data serialization is not required and disabling it allows you to inspect storage value in DevTools; Available since redux-persist@5.4.0
	deserialize: false, // Required to bear same value as `serialize` since redux-persist@6.0
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
