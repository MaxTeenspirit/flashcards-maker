import {Heading, Tabs, Tab, TabList, TabPanels, TabPanel} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';

import {CardForm, DeckForm} from '@organisms';

const Create = () => {
	const {deck} = useParams();

	return (
		<Tabs defaultIndex={deck ? 1 : 0} isFitted variant="solid-rounded" maxWidth="680px" margin="0 auto">
			<Heading as="h1">Create a {deck ? 'Deck' : 'Card'}</Heading>
			<TabList mb="2rem">
				<Tab>Card</Tab>
				<Tab>Deck</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<CardForm />
				</TabPanel>
				<TabPanel>
					<DeckForm />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default Create;
