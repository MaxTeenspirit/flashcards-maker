import {memo} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Box, Button, FormControl, FormLabel, Input, Stack, useToast} from '@chakra-ui/react';

import {IDeck} from '@redux-types';
import {addDeck} from '@slices';

import {IDeckForm} from './IDeckForm.ts';

const DeckForm = memo(({isEdit}: IDeckForm) => {
	const dispatch = useDispatch();
	const toast = useToast();

	const {register, handleSubmit, reset} = useForm<IDeck>();

	const onSubmit = (data: IDeck) => {
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
	};

	if (isEdit) {
		return <Box>Редагування</Box>;
	}

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
					Додати стек
				</Button>
			</Stack>
		</Box>
	);
});

export default DeckForm;
