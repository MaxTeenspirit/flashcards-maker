import {useState, useEffect} from 'react';
import {Heading, Tabs, Tab, TabList, TabPanels, TabPanel} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';

import {CardForm, DeckForm} from '@organisms';

const Create = ({isEdit}: {isEdit?: boolean}) => {
	const {deckId} = useParams();
	const {cardId} = useParams();

	const [activeTab, setActiveTab] = useState((isEdit && deckId) || deckId ? 1 : 0);

	useEffect(() => {
		if (isEdit && deckId) {
			setActiveTab(1);
		}
	}, [isEdit, deckId, cardId]);

	const handleTabsChange = (index: number) => {
		setActiveTab(index);
	};

	return (
		<Tabs
			index={activeTab}
			defaultIndex={(isEdit && deckId) || deckId ? 1 : 0}
			onChange={handleTabsChange}
			isFitted
			variant="solid-rounded"
			maxWidth="680px"
			margin="0 auto"
		>
			<Heading as="h1">
				{isEdit && cardId
					? 'Редагувати картку'
					: isEdit && deckId
					? 'Редагувати стек'
					: `Створити ${deckId || activeTab ? 'стек карток' : 'картку'}`}
			</Heading>
			{!isEdit && (
				<TabList mb="2rem">
					<Tab>Картку</Tab>
					<Tab>Стек карток</Tab>
				</TabList>
			)}
			<TabPanels>
				<TabPanel>
					<CardForm isEdit={isEdit} cardId={cardId} />
				</TabPanel>
				<TabPanel>
					<DeckForm isEdit={isEdit} deckId={deckId} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default Create;
