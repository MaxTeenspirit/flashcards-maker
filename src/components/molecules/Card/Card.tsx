import {Card as CardUI, CardBody, CardHeader, Heading, Flex, Text} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';

import {chooseBackgroundColor} from '@helpers';
import {deleteCard} from '@slices';

import CardMenu from '../CardMenu';

import {ICardProps} from './ICard';

const Card = ({card}: ICardProps) => {
	const dispatch = useDispatch();

	const handleDeleteCard = () => {
		dispatch(deleteCard({id: card.id}));
	};

	return (
		<CardUI backgroundColor={chooseBackgroundColor(card)}>
			<CardHeader
				p={card?.wordType === 'adjective' ? '0.5rem 1rem 2.3rem 1rem' : '0.5rem 1rem 0rem 1rem'}
				fontSize={['2rem', '1.2rem']}
				whiteSpace="nowrap"
			>
				<Flex width="100%" alignItems="center" justifyContent="space-between">
					<Heading size="h4">
						{card?.wordType === 'noun' ? card.article + ' ' : ''}
						{card.word} -{' '}
						<Text as="span" textAlign="start">
							{card.translation}
						</Text>
					</Heading>
					<CardMenu>
						<CardMenu.Item onClick={handleDeleteCard}>Delete</CardMenu.Item>
					</CardMenu>
				</Flex>
			</CardHeader>
			{card?.wordType === 'noun' && card?.plural ? (
				<CardBody p="0rem 1rem 0.5rem 1rem" fontSize={['2rem', '1.2rem']}>
					<Text textAlign="start">{`die ${card.plural}`}</Text>
				</CardBody>
			) : null}
			{card?.wordType === 'verb' ? (
				<CardBody p="0rem 1rem 0.5rem 1rem" fontSize={['1.5rem', '1rem']}>
					<Text pb="0.3rem" textAlign="start">
						{card?.isStrong ? 'сильний' : 'слабкий'}
					</Text>
				</CardBody>
			) : null}
		</CardUI>
	);
};

export default Card;