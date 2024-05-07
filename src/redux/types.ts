export interface ICard {
	id?: string;
	single: string;
	plural: string;
	translation: string;
	timesShowed: number;
	isNew: boolean;
}

export interface IInitialState {
	cards: ICard[];
}
