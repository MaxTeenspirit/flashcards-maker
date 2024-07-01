import {useSelector} from 'react-redux';

import {Modal} from '@atoms';
import {StackTable} from '@molecules';
import {RootState} from '@redux';

import {IStackWordsModal} from './IStackWordsModal';

const StackWordsModal = ({deck, children}: IStackWordsModal) => {
	const {cards} = useSelector((state: RootState) => state.cards);

	const filteredCards = cards.filter((card) => card.deck === deck.id);

	const sortedByArticle = filteredCards.sort((a, b) => {
		const order: {[key: string]: number} = {
			der: 1,
			das: 2,
			die: 3,
		};

		const aArticle = a?.article || '';
		const bArticle = b?.article || '';

		const aOrder = order[aArticle] || 4;
		const bOrder = order[bArticle] || 4;

		return aOrder - bOrder;
	});

	if (!sortedByArticle?.length) {
		return children;
	}

	return (
		<Modal trigger={children} isCloseButton isBackgroundClose>
			<StackTable deckName={deck.name} cards={sortedByArticle} />
		</Modal>
	);
};

export default StackWordsModal;
