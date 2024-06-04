import {useState} from 'react';
import {Heading, Box} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {RootState} from '@redux';
import {PlayForm, LearnCards} from '@organisms';
import {getWordsFromDeck, shuffleArray} from '@helpers';

const Learn = () => {
	const {deckId} = useParams();
	const {cards} = useSelector((state: RootState) => state.cards);
	const [isTranslationFirst, setTranslationFirst] = useState(false);

	const words = getWordsFromDeck(cards, deckId);
	const shuffledWords = shuffleArray(words);

	if (!deckId) {
		return (
			<>
				<Heading as="h1">Оберіть стек</Heading>
				<PlayForm setTranslationFirst={setTranslationFirst} />
			</>
		);
	}

	return (
		<Box overflow="hidden">
			<LearnCards isTranslationFirst={isTranslationFirst} words={shuffledWords} />
		</Box>
	);
};

export default Learn;
