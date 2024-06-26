import {Dispatch} from 'react';
import {ICard, IDeck} from '@redux-types';

export interface ISearch {
	searchValue: string;
	setSearchValue: (data: string) => void;
	entities: ICard[] | IDeck[];
	entityType: 'card' | 'deck';
	setCards?: Dispatch<React.SetStateAction<ICard[]>>;
	setDecks?: Dispatch<React.SetStateAction<IDeck[]>>;
	handlePageChange: (page: number) => void;
}
