export interface ICard {
	id?: string;
	article?: string;
	wordType: string;
	word: string;
	translation: string;
	plural?: string;
	deck: string;
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
