import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

import {Home, Decks, Learn, Create, AllCards} from '@pages';
import App from '../App';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<Home />} />
			<Route path="/decks" element={<Decks />} />
			<Route path="/decks/:deckId" element={<Decks />} />
			<Route path="/learn" element={<Learn />} />
			<Route path="/learn/:deckId" element={<Learn />} />
			<Route path="/allCards" element={<AllCards />} />
			<Route path="/create" element={<Create />} />
			<Route path="/create/:deckId" element={<Create />} />
			<Route path="/edit-card/:cardId" element={<Create isEdit />} />
			<Route path="/edit-deck/:deckId" element={<Create isEdit />} />
		</Route>,
	),
);
