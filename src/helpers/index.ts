import {ICard} from '@redux-types';

export const capitalizeWord = (word: string) => {
	if (!word) {
		return '';
	}

	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const chooseBackgroundColor = (card: ICard) => {
	if (card.wordType === 'noun') {
		switch (card.article) {
			case 'der':
				return '#CCEBFC';
			case 'die':
				return '#FFE6E6';
			case 'das':
				return '#DCF7DC';
			default:
				break;
		}
	}

	if (card.wordType === 'verb') {
		return '#F9F7C9';
	}

	if (card.wordType === 'adjective') {
		return '#FFDCA9';
	}

	return 'white';
};
