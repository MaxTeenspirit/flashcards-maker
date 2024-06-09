import {IWord} from '@redux-types';

export interface ILearnCards {
	words: IWord[];
	isTranslationFirst?: boolean;
}
