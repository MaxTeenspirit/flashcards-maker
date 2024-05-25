import {Box, Heading} from '@chakra-ui/react';

import {CardForm} from '@organisms';

const Create = () => {
	return (
		<Box>
			<Heading as="h1">Create a Card</Heading>
			<CardForm />
		</Box>
	);
};

export default Create;
