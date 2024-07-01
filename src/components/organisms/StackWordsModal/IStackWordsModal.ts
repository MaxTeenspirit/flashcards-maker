import {IDeck} from '@redux-types';
import {ReactNode} from 'react';

export interface IStackWordsModal {
	deck: IDeck;
	children: ReactNode;
}
