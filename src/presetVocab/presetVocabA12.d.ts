import {ICard} from '../redux/types';

declare module 'presetVocabA12' {
	const cheat1: ICard[];
	const cheat2: ICard[];
	const cheat3: ICard[];
	const cheat4: ICard[];
	const cheat5: ICard[];

	const result: {
		cheat1: typeof cheat1;
		cheat2: typeof cheat2;
		cheat3: typeof cheat3;
		cheat4: typeof cheat4;
		cheat5: typeof cheat5;
	};
	export default result;
}
