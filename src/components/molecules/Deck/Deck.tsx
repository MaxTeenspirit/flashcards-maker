import {Card as CardUI, CardBody, CardHeader, Heading, Flex, Text, useMediaQuery, useToast} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

import {deleteDeck, deleteCards, setDefaultCardsDeck} from '@slices';
import {getRandomSubset} from '@helpers';
import {RootState} from '@redux';

import CardMenu from '../CardMenu';
import Modal from '../Modal';

import {IDeckProps} from './IDeck.ts';

const Deck = ({deck}: IDeckProps) => {
	const dispatch = useDispatch();
	const toast = useToast();
	const [isMobile] = useMediaQuery('(max-width: 425px)');

	const {cards} = useSelector((state: RootState) => state.cards);

	const cardsInCurrentDeck = cards.filter((card) => card.deck === deck.id);

	const showToast = (isCards?: boolean, allDelete?: boolean) =>
		toast({
			title: allDelete
				? `Cтек "Всі слова" неможливо видалити!`
				: `Стек ${deck.name} видалено${isCards ? ' разом з картками!' : '!'}`,
			description: '',
			status: allDelete ? 'error' : 'success',
			duration: 4000,
			isClosable: true,
		});

	const handleDeleteDeck = () => {
		if (deck.id === 'all') {
			showToast(false, true);
			return;
		}
		dispatch(setDefaultCardsDeck({deckId: deck.id}));
		dispatch(deleteDeck({id: deck.id}));
		showToast();
	};

	const handleDeleteDeckWithCards = () => {
		if (deck.id === 'all') {
			showToast(false, true);
			return;
		}
		dispatch(deleteCards({cards: cardsInCurrentDeck}));
		dispatch(deleteDeck({id: deck.id}));
		showToast(true);
	};

	const cardsToDisplay = getRandomSubset(cardsInCurrentDeck, 3).filter((card) => card.deck === deck.id);

	return (
		<CardUI>
			<CardHeader p="0.5rem 1rem 0rem 1rem" fontSize={['2rem', '1.2rem']} whiteSpace={isMobile ? '' : 'nowrap'}>
				<Flex width="100%" alignItems="center" justifyContent="space-between">
					<Heading textAlign="left" size="h4">
						{deck.name}
					</Heading>
					{deck.id !== 'all' && (
						<CardMenu>
							<Modal
								text={{
									message: 'Ця дія видалить лише стек, картки залишаться!',
									title: `Видалити стек ${deck.name}?`,
									cancel: 'Відміна',
									approve: 'Видалити',
								}}
								onApprove={handleDeleteDeck}
								trigger={<CardMenu.Item fontSize={['1.6rem', '1.2rem']}>Видалити</CardMenu.Item>}
							/>
							<Modal
								text={{
									message: 'Ця дія видалить стек з усіма картками в ньому!',
									title: `Видалити стек ${deck.name} з усіма картками?`,
									cancel: 'Відміна',
									approve: 'Видалити з картками',
								}}
								onApprove={handleDeleteDeckWithCards}
								trigger={
									<CardMenu.Item fontSize={['1.6rem', '1.2rem']}>Видалити з картками</CardMenu.Item>
								}
							/>
						</CardMenu>
					)}
				</Flex>
			</CardHeader>
			<CardBody pt={0}>
				{!cardsToDisplay?.length ? (
					<Text as="span">У стеку немає карток</Text>
				) : (
					<Text as="span">Деякі слова: </Text>
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
