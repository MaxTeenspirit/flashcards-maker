import {useEffect, memo} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Button, FormControl, FormLabel, Input, Select, Stack, useToast} from '@chakra-ui/react';

import {InputWrapper} from '@molecules';
import {RootState} from '@redux';
import {ICard} from '@redux-types';
import {addCard, addCardToDeck, editCard} from '@slices';
import {capitalizeWord, lowerWord, removeArticle} from '@helpers';

import {ICardForm} from './ICardForm.ts';

const CardForm = memo(({isEdit, cardId}: ICardForm) => {
	const dispatch = useDispatch();
	const toast = useToast();

	const {register, handleSubmit, watch, reset, setValue} = useForm<ICard>();

	const {decks} = useSelector((state: RootState) => state.decks);
	const {cards} = useSelector((state: RootState) => state.cards);

	const cardToEdit: ICard | undefined = cards.find((card) => card.id === cardId);

	const wordType = watch('wordType');

	useEffect(() => {
		setValue('plural', '=');
	}, [setValue]);

	useEffect(() => {
		if (cardToEdit && isEdit) {
			const fieldsToSet: Array<keyof ICard> = ['wordType', 'article', 'word', 'plural', 'translation', 'deck'];

			fieldsToSet.forEach((field) => {
				if (field in cardToEdit) {
					setValue(field, cardToEdit[field]);
				}
			});
		}
	}, [isEdit, cardToEdit, setValue]);

	const onSubmit = (data: ICard) => {
		if (!isEdit) {
			const id = crypto.randomUUID();

			const newCard = {
				...data,
				id,
				article: data.wordType === 'noun' ? data?.article : '',
				word: data.wordType === 'noun' ? capitalizeWord(data?.word) : lowerWord(data?.word),
				plural: data?.plural ? removeArticle(data.plural) : '',
			};

			dispatch(addCard(newCard));
			dispatch(addCardToDeck({deckId: data.deck, cardId: id}));

			toast({
				title: `${data?.article ? data?.article + ' ' : ''}${data.word} картка створена!`,
				description: 'Наші вітання! Ви щойно створили нову картку.',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});

			reset();
		} else if (isEdit && cardToEdit) {
			dispatch(editCard({...data, id: cardToEdit.id}));

			if (cardToEdit.deck !== data.deck) {
				dispatch(
					addCardToDeck({
						deckId: data.deck,
						article: data.wordType === 'noun' ? data?.article : '',
						cardId: cardToEdit.id,
					}),
				);
			}

			toast({
				title: `${data?.article ? data?.article + ' ' : ''}${data.word} картка змінена!`,
				description: 'Ви успішно редагували картку.',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});

			reset();
		}
	};

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			p={7}
			borderWidth={1}
			backgroundColor="#FFFEED"
			borderColor="#979DA8"
			borderRadius="md"
			maxWidth="680px"
			margin="0 auto"
		>
			<Stack spacing={2}>
				<InputWrapper shouldMobileColumn={false}>
					<FormControl isRequired>
						<FormLabel>Тип слова</FormLabel>
						<Select {...register('wordType', {required: true})} placeholder="Оберіть тип слова">
							<option value="noun">Іменник</option>
							<option value="verb">Дієслово</option>
							<option value="adjective">Прикметник</option>
						</Select>
					</FormControl>

					{wordType === 'noun' && (
						<FormControl isRequired={wordType === 'noun'} isDisabled={wordType !== 'noun'} ml="1rem">
							<FormLabel>Артикль</FormLabel>
							<Select {...register('article', {required: wordType === 'noun'})}>
								<option value="der">Der</option>
								<option value="die">Die</option>
								<option value="das">Das</option>
							</Select>
						</FormControl>
					)}
				</InputWrapper>

				<FormControl isRequired>
					<FormLabel>Слово</FormLabel>
					<Input {...register('word', {required: true})} />
				</FormControl>

				{wordType === 'noun' && (
					<FormControl isDisabled={wordType !== 'noun'}>
						<FormLabel>Множина</FormLabel>
						<Input {...register('plural')} />
					</FormControl>
				)}

				<FormControl isRequired>
					<FormLabel>Переклад</FormLabel>
					<Input {...register('translation', {required: true})} />
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Стек</FormLabel>
					<Select {...register('deck', {required: true})}>
						{decks.map((deck) => (
							<option key={deck.id} value={deck.id}>
								{deck.name}
							</option>
						))}
					</Select>
				</FormControl>

				<Button type="submit" mt={6}>
					{`${isEdit ? 'Редагувати' : 'Додати'} картку`}
				</Button>
			</Stack>
		</Box>
	);
});

export default CardForm;
