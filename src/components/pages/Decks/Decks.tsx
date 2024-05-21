import {Box} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';

import {IDecks} from './IDecks.ts';

const Decks = (props: IDecks) => {
	const {deckId} = useParams();

	return (
		<Box>
			<Box>Decks</Box>
			{deckId ? <Box>{deckId}</Box> : <Box>Just decks</Box>}
		</Box>
	);
};

export default Decks;
