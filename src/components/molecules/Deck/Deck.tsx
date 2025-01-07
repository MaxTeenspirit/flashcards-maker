import {memo} from 'react';
import {Card as CardUI, CardBody, CardHeader, Heading, Flex, Text, useMediaQuery, useToast} from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {StackWordsModal} from '@organisms';
import {deleteDeck, deleteCards, setDefaultCardsDeck} from '@slices';
import {getRandomSubset, getIsPresetDeck} from '@helpers';
import {RootState} from '@redux';

import CardMenu from '../CardMenu';
import ModalWarning from '../ModalWarning/index.ts';

import {IDeckProps} from './IDeck.ts';

const Deck = ({deck}: IDeckProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const [isMobile] = useMediaQuery('(max-width: 425px)');

	const {cards} = useSelector((state: RootState) => state.cards);

	if (!deck) return;

	const cardsInCurrentDeck = cards.filter((card) => card.deck === deck.id);
	const cardsInCurrentDeckIds = cardsInCurrentDeck.map((card) => card.id);

	const isPresetDeck = getIsPresetDeck(deck);

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

	const handleDeleteCards = () => {
		dispatch(deleteCards({cards: cardsInCurrentDeckIds}));
	};

	const handleDeleteDeckWithCards = () => {
		if (deck.id === 'all') {
			showToast(false, true);
			return;
		}

		handleDeleteCards();
		dispatch(deleteDeck({id: deck.id}));
		showToast(true);
	};

	const cardsToDisplay = getRandomSubset(cardsInCurrentDeck, 3).filter((card) => card.deck === deck.id);

	return (
		<CardUI border="1px solid #42aaff">
			<CardHeader p="0.5rem 1rem 0rem 1rem" fontSize={['2rem', '1.2rem']} whiteSpace={isMobile ? '' : 'nowrap'}>
				<Flex width="100%" alignItems="center" justifyContent="space-between">
					<StackWordsModal deck={deck}>
						<Heading textAlign="left" size="h4" cursor="pointer">
							{deck.name}
						</Heading>
					</StackWordsModal>
					{deck.id !== 'all' && !isPresetDeck && (
						<CardMenu>
							<CardMenu.Item
								onClick={() => navigate(`/edit-deck/${deck.id}`)}
								fontSize={['1.6rem', '1.2rem']}
							>
								Редагувати
							</CardMenu.Item>
							<ModalWarning
								text={{
									message: 'Ця дія видалить лише стек, картки залишаться!',
									title: `Видалити стек ${deck.name}?`,
									cancel: 'Відміна',
									approve: 'Видалити',
								}}
								onApprove={handleDeleteDeck}
								trigger={<CardMenu.Item fontSize={['1.6rem', '1.2rem']}>Видалити</CardMenu.Item>}
							/>
							<ModalWarning
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
					{deck.id === 'all' && (
						<CardMenu>
							<ModalWarning
								text={{
									message: 'Ця дія видалить лише картки з цього стеку!',
									title: `Видалити картки з ${deck.name}?`,
									cancel: 'Відміна',
									approve: 'Видалити картки',
								}}
								onApprove={handleDeleteCards}
								trigger={<CardMenu.Item fontSize={['1.6rem', '1.2rem']}>Видалити картки</CardMenu.Item>}
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

export default memo(Deck);
