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
		<CardUI
			padding={['0rem 0 0.5rem 1rem', '0.5rem 0 1rem 1rem']}
			backgroundColor={chooseBackgroundColor(card)}
			border="1px solid #42aaff"
			minHeight={['4rem', '6rem']}
		>
			<CardHeader
				p={card?.wordType === 'adjective' ? '0.5rem 1rem 1.3rem 0.5rem' : '0.5rem 1rem 0rem 0.5rem'}
				fontSize={['2rem', '1.2rem']}
				whiteSpace={isMobile ? '' : 'nowrap'}
			>
				<Flex width="100%" alignItems="center" justifyContent="space-between">
					<Heading textAlign="left" fontSize={['1.2rem', '1.4rem', '1.6rem']} paddingBottom="0.5rem">
						{card?.wordType === 'noun' ? card.article + ' ' : ''}
						{card.word} -{' '}
						<Text textAlign="left" as="span">
							{card.translation}
						</Text>
					</Heading>
					<CardMenu>
						<CardMenu.Item
							fontSize={['1.6rem', '1.2rem']}
							onClick={() => navigate(`/edit-card/${card.id}`)}
						>
							Редагувати
						</CardMenu.Item>
						<Modal
							text={{
								message: `Ви впевнені, що хочете видалити картку ${card.word}?`,
								title: `Видалити ${card.word}?`,
								cancel: 'Відміна',
								approve: 'Видалити',
							}}
							onApprove={handleDeleteCard}
							trigger={<CardMenu.Item fontSize={['1.6rem', '1.2rem']}>Видалити</CardMenu.Item>}
						/>
					</CardMenu>
				</Flex>
			</CardHeader>
			{card?.wordType === 'noun' ? (
				<CardBody flexGrow="initial" p="0rem 1rem 0rem 0.5rem" fontSize={['1.1rem', '1.2rem']}>
					{card?.plural ? (
						<Text textAlign="left">{`die ${card.plural}`}</Text>
					) : (
						<Text textAlign="left">-</Text>
					)}
				</CardBody>
			) : null}
			{card?.wordType === 'verb' ? (
				<CardBody flexGrow="initial" p="0rem 1rem 0rem 0.5rem" fontSize={['1.1rem', '1rem']}>
					<Text textAlign="left">{card?.isStrong ? 'сильний' : 'слабкий'}</Text>
				</CardBody>
			) : null}
		</CardUI>
	);
};

export default Card;
