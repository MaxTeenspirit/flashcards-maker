import {Heading} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {RootState} from '@redux';
import {PlayForm, LearnCards} from '@organisms';
import {getWordsFromDeck} from '@helpers';

const Learn = () => {
	const {deckId} = useParams();
	const {cards} = useSelector((state: RootState) => state.cards);

	const words = getWordsFromDeck(cards, deckId);

	if (!deckId) {
		return (
			<>
				<Heading as="h1">Оберіть стек</Heading>
				<PlayForm />
			</>
		);
	}

	return (
		<>
			<LearnCards words={words} />
		</>
	);
};

export default Learn;
