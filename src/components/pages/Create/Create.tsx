import {Box, Heading} from '@chakra-ui/react';

import {CardForm} from '@organisms';

import {ICreate} from './ICreate.ts';

const Create = (props: ICreate) => {
	return (
		<Box>
			<Heading as="h1">Create a card</Heading>
			<CardForm />
		</Box>
	);
};

export default Create;
