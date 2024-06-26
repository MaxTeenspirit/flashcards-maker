import {ChangeEventHandler} from 'react';

export interface ISearchInput {
	value?: string;
	placeholder?: string;
	clearInput: () => void;
	setValue: ChangeEventHandler<HTMLInputElement>;
}
