import {Card as CardUI, CardBody, CardHeader, Heading, Flex, Text, useMediaQuery} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

import {deleteDeck} from '@slices';
import {getRandomSubset} from '@helpers';
import {RootState} from '@redux';

import CardMenu from '../CardMenu';

import {IDeckProps} from './IDeck.ts';

const Deck = ({deck}: IDeckProps) => {
	const dispatch = useDispatch();
	const [isMobile] = useMediaQuery('(max-width: 425px)');

	const {cards} = useSelector((state: RootState) => state.cards);

	const handleDeleteCard = () => {
		dispatch(deleteDeck({id: deck.id}));
	};

	const cardsToDisplay = getRandomSubset(cards, 3).filter((card) => card.deck === deck.id);

	return (
		<CardUI>
			<CardHeader p="0.5rem 1rem 0rem 1rem" fontSize={['2rem', '1.2rem']} whiteSpace={isMobile ? '' : 'nowrap'}>
				<Flex width="100%" alignItems="center" justifyContent="space-between">
					<Heading textAlign="left" size="h4">
						{deck.name}
					</Heading>
					<CardMenu>
						<CardMenu.Item onClick={handleDeleteCard}>Delete</CardMenu.Item>
					</CardMenu>
				</Flex>
			</CardHeader>
			<CardBody pt={0}>
				{!cardsToDisplay?.length ? (
					<Text as="span">No cards in this deck</Text>
				) : (
					<Text as="span">Some words: </Text>
				)}
				{cardsToDisplay.map((card, index) => (
					<Text as="span" key={card?.id || card?.word}>
						{`${card.word}${index < cardsToDisplay.length - 1 ? ', ' : ''}`}
					</Text>
				))}
			</CardBody>
		</CardUI>
	);
};

export default Deck;
