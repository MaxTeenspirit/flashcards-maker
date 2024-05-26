import {useEffect, memo} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Button, FormControl, FormLabel, Input, Select, Stack, Checkbox, useToast} from '@chakra-ui/react';

import {RootState} from '@redux';
import {capitalizeWord} from '@helpers';
import {ICard} from '@redux-types';
import {addCard, addCardToDeck} from '@slices';
import {InputWrapper} from '@molecules';

import {ICardForm} from './ICardForm.ts';

const CardForm = memo(({isEditing}: ICardForm) => {
	const dispatch = useDispatch();
	const toast = useToast();

	const {register, handleSubmit, watch, reset, setValue} = useForm<ICard>();

	const {decks} = useSelector((state: RootState) => state.decks);

	const wordType = watch('wordType');

	useEffect(() => {
		setValue('plural', '=');
	}, [setValue]);

	const onSubmit = (data: ICard) => {
		const id = crypto.randomUUID();

		const newCard = {...data, id, word: capitalizeWord(data?.word)};

		dispatch(addCard(newCard));
		dispatch(addCardToDeck({deckId: data.deck, cardId: id}));

		toast({
			title: `${data?.article ? data?.article + ' ' : ''}${data.word} card is added!`,
			description: "We've created a card and placed it to the deck.",
			status: 'success',
			duration: 4000,
			isClosable: true,
		});

		reset();
	};

	if (isEditing) {
		return <Box>Editing</Box>;
	}

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			p={7}
			borderWidth={1}
			backgroundColor="#EFEFEF"
			borderRadius="md"
			maxWidth="680px"
			margin="0 auto"
		>
			<Stack spacing={2}>
				<InputWrapper shouldMobileColumn={false}>
					<FormControl isRequired>
						<FormLabel>Type</FormLabel>
						<Select {...register('wordType', {required: true})} placeholder="Select type of the word">
							<option value="noun">Noun</option>
							<option value="verb">Verb</option>
							<option value="adjective">Adjective</option>
						</Select>
					</FormControl>

					{wordType === 'noun' && (
						<FormControl isRequired={wordType === 'noun'} isDisabled={wordType !== 'noun'} ml="1rem">
							<FormLabel>Article</FormLabel>
							<Select {...register('article', {required: wordType === 'noun'})}>
								<option value="der">Der</option>
								<option value="die">Die</option>
								<option value="das">Das</option>
							</Select>
						</FormControl>
					)}

					{wordType === 'verb' && (
						<FormControl isRequired={false}>
							<Box display="flex" alignItems="center" justifyContent="center">
								<Checkbox {...register('isStrong', {required: false})}>Is strong</Checkbox>
							</Box>
						</FormControl>
					)}
				</InputWrapper>

				<FormControl isRequired>
					<FormLabel>Word</FormLabel>
					<Input {...register('word', {required: true})} />
				</FormControl>

				{wordType === 'noun' && (
					<FormControl isRequired={wordType === 'noun'} isDisabled={wordType !== 'noun'}>
						<FormLabel>Plural</FormLabel>
						<Input {...register('plural', {required: wordType === 'noun'})} />
					</FormControl>
				)}

				<FormControl isRequired>
					<FormLabel>Translation</FormLabel>
					<Input {...register('translation', {required: true})} />
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Deck</FormLabel>
					<Select {...register('deck', {required: true})}>
						{decks.map((deck) => (
							<option key={deck.id} value={deck.id}>
								{deck.name}
							</option>
						))}
					</Select>
				</FormControl>

				<Button type="submit" mt={6}>
					Add Card
				</Button>
			</Stack>
		</Box>
	);
});

export default CardForm;
