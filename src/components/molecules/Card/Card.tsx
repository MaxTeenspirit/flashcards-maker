import {Card as CardUI, CardBody, CardHeader, Heading, Flex, Text, useMediaQuery} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {chooseBackgroundColor} from '@helpers';
import {deleteCard, deleteCardFromDeck} from '@slices';

import CardMenu from '../CardMenu';
import Modal from '../Modal';

import {ICardProps} from './ICard';

const Card = ({card}: ICardProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isMobile] = useMediaQuery('(max-width: 425px)');

	const handleDeleteCard = () => {
		dispatch(deleteCard({id: card.id}));
		dispatch(deleteCardFromDeck({id: card.deck, cardId: card.id}));
	};

	return (
		<CardUI backgroundColor={chooseBackgroundColor(card)}>
			<CardHeader
				p={card?.wordType === 'adjective' ? '0.5rem 1rem 2.3rem 1rem' : '0.5rem 1rem 0rem 1rem'}
				fontSize={['2rem', '1.2rem']}
				whiteSpace={isMobile ? '' : 'nowrap'}
			>
				<Flex width="100%" alignItems="center" justifyContent="space-between">
					<Heading textAlign="left" size="h4">
						{card?.wordType === 'noun' ? card.article + ' ' : ''}
						{card.word} -{' '}
						<Text textAlign="left" as="span">
							{card.translation}
						</Text>
					</Heading>
					<CardMenu>
						<CardMenu.Item onClick={() => navigate(`/edit-card/${card.id}`)}>Редагувати</CardMenu.Item>
						<Modal
							text={{
								message: `Ви впевнені, що хочете видалити картку ${card.word}?`,
								title: `Видалити ${card.word}?`,
								cancel: 'Відміна',
								approve: 'Видалити',
							}}
							onApprove={handleDeleteCard}
							trigger={<CardMenu.Item>Видалити</CardMenu.Item>}
						/>
					</CardMenu>
				</Flex>
			</CardHeader>
			{card?.wordType === 'noun' && card?.plural ? (
				<CardBody p="0rem 1rem 0.5rem 1rem" fontSize={['1.1rem', '1.2rem']}>
					<Text textAlign="left">{`die ${card.plural}`}</Text>
				</CardBody>
			) : null}
			{card?.wordType === 'verb' ? (
				<CardBody p="0rem 1rem 0.5rem 1rem" fontSize={['1.1rem', '1rem']}>
					<Text textAlign="left" pb="0.3rem">
						{card?.isStrong ? 'сильний' : 'слабкий'}
					</Text>
				</CardBody>
			) : null}
		</CardUI>
	);
};

export default Card;
