import {ChangeEventHandler} from 'react';

export interface ISearchInput {
	value?: string;
	placeholder?: string;
	setValue: ChangeEventHandler<HTMLInputElement>;
}
