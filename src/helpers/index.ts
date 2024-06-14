import {ICard, IWord} from '@redux-types';

export const capitalizeWord = (word: string) => {
	if (!word) {
		return '';
	}

	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const chooseBackgroundColor = (card: ICard | IWord) => {
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
		return '#f0ffc4';
	}

	return 'white';
};

export const getRandomSubset = <T>(arr: T[], num: number): T[] => {
	if (arr.length <= num) {
		return arr;
	}

	const arrayCopy = [...arr];

	for (let i = arrayCopy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
	}

	return arrayCopy.slice(0, num);
};

export const getWordsFromDeck = (cards?: ICard[], deckId?: string): IWord[] => {
	if (!cards || !cards?.length || !deckId) {
		return [];
	}

	const cardsInDeck = deckId === 'all-cards' ? cards : cards.filter((card) => card.deck === deckId);

	return cardsInDeck.map((card) => ({
		id: card.id,
		word: card.word,
		translation: card.translation,
		plural: card?.plural,
		isStrong: card?.isStrong,
		wordType: card.wordType,
		article: card?.article,
	}));
};

export const getRandomIndexFromArray = <T>(array: Array<T> | null, prevIndex?: number): number => {
	if (!array || !array.length || array.length <= 1) {
		return 0;
	}

	const randomBytes = new Uint32Array(1);
	crypto.getRandomValues(randomBytes);

	const newIndex = randomBytes[0] % array.length;

	const randomIndex = newIndex === prevIndex ? getRandomIndexFromArray(array, newIndex) : newIndex;

	return randomIndex;
};

export const shuffleArray = <T>(array: T[]): T[] => {
	if (!array?.length) {
		return [];
	}

	return array.reduce<T[]>((shuffled, _, i) => {
		const j = Math.floor(Math.random() * (i + 1));
		if (j !== i) shuffled[i] = shuffled[j];
		shuffled[j] = array[i];
		return shuffled;
	}, []);
};

export const normalizeLetter = (letter: string): string => {
	const normalizationMap: {[key: string]: string} = {
		ö: 'o',
		ü: 'u',
		ä: 'a',
	};
	return letter.replace(/[öüä]/g, (match) => normalizationMap[match]);
};
