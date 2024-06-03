import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {Box, Button, FormControl, FormLabel, Select, Stack, useToast} from '@chakra-ui/react';

import {RootState} from '@redux';

const PlayForm = () => {
	const {decks} = useSelector((state: RootState) => state.decks);
	const {register, handleSubmit} = useForm<{deck: string}>();
	const toast = useToast();

	const navigate = useNavigate();

	const onSubmit = (data: {deck: string}) => {
		const {deck} = data;
		const selectedDeck = decks.find((deck) => deck.id === data.deck);

		if (selectedDeck && selectedDeck?.cards.length > 1) {
			navigate(`/learn/${deck}`);
		} else {
			toast({
				title: 'Замало карток у стеку!',
				description: 'Спочатку додайте картки у цей стек стек',
				status: 'error',
				duration: 4000,
				isClosable: true,
			});
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
					Грати!
				</Button>
			</Stack>
		</Box>
	);
};

export default PlayForm;
