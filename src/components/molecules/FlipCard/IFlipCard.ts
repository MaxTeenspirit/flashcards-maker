import {IWord} from '@redux-types';

export interface IFlipCard {
	word: IWord;
	isTranslationFirst?: boolean;
}
