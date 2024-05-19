import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

import {Home, Decks, Learn} from '@pages';
import App from '../App';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<Home />} />
			<Route path="/decks" element={<Decks />} />
			<Route path="/decks/:deckId" element={<Decks />} />
			<Route path="/learn" element={<Learn />} />
		</Route>,
	),
);
