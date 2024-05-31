import {useState} from 'react';
import {Heading, Tabs, Tab, TabList, TabPanels, TabPanel} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';

import {CardForm, DeckForm} from '@organisms';

const Create = () => {
	const {deck} = useParams();

	const [activeTab, setActiveTab] = useState(0);

	const handleTabsChange = (index: number) => {
		setActiveTab(index);
	};

	return (
		<Tabs
			index={activeTab}
			defaultIndex={deck ? 1 : 0}
			onChange={handleTabsChange}
			isFitted
			variant="solid-rounded"
			maxWidth="680px"
			margin="0 auto"
		>
			<Heading as="h1">Створити {deck || activeTab ? 'стек карток' : 'картку'}</Heading>
			<TabList mb="2rem">
				<Tab>Картку</Tab>
				<Tab>Стек карток</Tab>
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
