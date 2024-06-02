export interface ICard {
	id: string;
	article?: string;
	wordType: string;
	word: string;
	translation: string;
	plural?: string;
	deck: string;
	isStrong?: boolean;
}

export interface ICardInitialState {
	cards: ICard[];
}

export interface IDeck {
	id?: string;
	name: string;
	cards: string[];
}

export interface IDeckInitialState {
	decks: IDeck[];
}

export interface IWord extends Omit<ICard, 'id' | 'deck'> {
	article?: string;
	word: string;
	plural?: string | undefined;
	translation: string;
	isStrong?: boolean;
	wordType: string;
}
