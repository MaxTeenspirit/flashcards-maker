import {useEffect, useState, memo} from 'react';
import {Card as CardUI, CardBody, CardHeader, Heading, Flex, Text, useMediaQuery} from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';

import {RootState} from '@redux';
import {chooseBackgroundColor} from '@helpers';
import {deleteCard, deleteCardFromDeck} from '@slices';
import {IDictionaryData, IVerbData} from '@redux-types';

import {useGetVerbDataQuery} from 'redux/slices/dictionarySlice';
import CardMenu from '../CardMenu';
import ModalWarning from '../ModalWarning';

import {ICardProps} from './ICard';

const Card = ({card}: ICardProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isMobile] = useMediaQuery('(max-width: 425px)');

	const [dictionaryData, setDictionaryData] = useState<IVerbData>();

	const settings = useSelector((state: RootState) => state.settings);

	const {data: verbData} = useGetVerbDataQuery(card?.word[0]?.toLowerCase(), {
		skip: !card?.word || card?.wordType !== 'verb',
	}) as {
		data: IDictionaryData | undefined;
		error: FetchBaseQueryError | SerializedError | undefined;
	};

	useEffect(() => {
		const word = card?.word;
		const type = card?.wordType;

		if (!!word && type === 'verb' && verbData) {
			setDictionaryData(verbData[word?.toLowerCase()]);
		}
	}, [card?.word, card?.wordType, verbData]);

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
				p={'0.2rem 1rem 0rem 0.5rem'}
				fontSize={['2rem', '1.2rem']}
				whiteSpace={isMobile ? '' : 'nowrap'}
			>
				<Flex width="100%" alignItems="center" justifyContent="space-between">
					<Heading textAlign="left" fontSize={['1.2rem', '1.4rem', '1.6rem']} paddingBottom="0">
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
						<ModalWarning
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
					{card?.plural && card?.plural !== '-' ? <Text textAlign="left">{`die ${card.plural}`}</Text> : null}
				</CardBody>
			) : null}
			{card?.wordType === 'verb' ? (
				<CardBody flexGrow="initial" p="0rem 1rem 0rem 0.5rem" fontSize={['1.1rem', '1rem']}>
					{!!settings?.perfekt && !!dictionaryData?.perfekt && (
						<Text as="p" textAlign="left">
							<Text as="span" color="#919191">
								Part.II:{' '}
							</Text>
							{dictionaryData?.perfekt + '; '}
						</Text>
					)}
					{!!settings?.prateritum && !!dictionaryData?.prateritum && (
						<Text as="p" textAlign="left">
							<Text as="span" color="#919191">
								Prät.:{' '}
							</Text>
							{dictionaryData?.prateritum};
						</Text>
					)}
				</CardBody>
			) : null}
		</CardUI>
	);
};

export default memo(Card);
