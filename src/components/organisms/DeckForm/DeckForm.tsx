import {memo, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Button, FormControl, FormLabel, Input, Stack, useToast} from '@chakra-ui/react';

import {IDeck} from '@redux-types';
import {addDeck, editDeck} from '@slices';
import {RootState} from '@redux';

import {IDeckForm} from './IDeckForm.ts';

const DeckForm = memo(({isEdit, deckId}: IDeckForm) => {
	const dispatch = useDispatch();
	const toast = useToast();

	const {decks} = useSelector((state: RootState) => state.decks);

	const deckToEdit: IDeck | undefined = decks.find((deck) => deck.id === deckId);

	const {register, handleSubmit, reset, setValue} = useForm<IDeck>();

	useEffect(() => {
		if (deckToEdit && isEdit) {
			setValue('name', deckToEdit.name);
		}
	}, [deckToEdit, isEdit, setValue]);

	const onSubmit = (data: IDeck) => {
		if (!isEdit) {
			const id = crypto.randomUUID();

			const newDeck = {...data, id, cards: []};

			dispatch(addDeck(newDeck));

			toast({
				title: `Стек ${data.name} створено`,
				description: 'Тепер створюйте картки в цьому стеку!',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});

			reset();
		} else if (isEdit && deckToEdit) {
			dispatch(editDeck({id: deckToEdit.id, name: data.name}));
		}
	};

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			p={7}
			borderWidth={1}
			backgroundColor="#F5F5F5"
			borderColor="#979DA8"
			borderRadius="md"
			maxWidth="680px"
			margin="0 auto"
		>
			<Stack spacing={2}>
				<FormControl isRequired>
					<FormLabel>Назва стеку</FormLabel>
					<Input {...register('name', {required: true})} />
				</FormControl>

				<Button type="submit" mt={6}>
					{`${isEdit ? 'Редагувати' : 'Додати'} стек`}
				</Button>
			</Stack>
		</Box>
	);
});

export default DeckForm;
