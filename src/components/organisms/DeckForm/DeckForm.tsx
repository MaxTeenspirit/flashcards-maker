import {memo} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Box, Button, FormControl, FormLabel, Input, Stack, useToast} from '@chakra-ui/react';

import {IDeck} from '@redux-types';
import {addDeck} from '@slices';

import {IDeckForm} from './IDeckForm.ts';

const DeckForm = memo(({isEditing}: IDeckForm) => {
	const dispatch = useDispatch();
	const toast = useToast();

	const {register, handleSubmit, reset} = useForm<IDeck>();

	const onSubmit = (data: IDeck) => {
		const id = crypto.randomUUID();

		const newDeck = {...data, id, cards: []};

		dispatch(addDeck(newDeck));

		toast({
			title: `Deck ${data.name} is added`,
			description: 'Now you have a deck!',
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
				<FormControl isRequired>
					<FormLabel>Deck name</FormLabel>
					<Input {...register('name', {required: true})} />
				</FormControl>

				<Button type="submit" mt={6}>
					Add Deck
				</Button>
			</Stack>
		</Box>
	);
});

export default DeckForm;
