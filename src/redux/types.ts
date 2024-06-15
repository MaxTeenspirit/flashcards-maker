export interface ICard {
	id: string;
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

export interface IWord extends Omit<ICard, 'deck'> {
	id: string;
	article?: string;
	word: string;
	plural?: string | undefined;
	translation: string;
	wordType: string;
}

export interface IDictionaryData {
	[key: string]: IVerbData;
}

export interface IVerbData {
	perfekt: string;
	prateritum: string;
}

export interface ISettingsInitialState {
	perfekt: boolean;
	prateritum: boolean;
}
