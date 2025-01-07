import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {IDeck, ISettingsInitialState} from '@redux-types';
import {addDeck, addCard, deleteDeck, deleteCards} from '@slices';

import vocabA12 from '../presetVocab/presetVocabA12';

const usePresetVocab = (settings?: ISettingsInitialState, decks?: IDeck[]) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (settings && decks?.length && typeof settings.presetA12 === 'boolean') {
			const areDecksPresent = decks.some((deck) => deck?.id?.includes('A1.2'));

			if (settings.presetA12 && !areDecksPresent) {
				for (let i = 0; i < vocabA12?.length; i++) {
					dispatch(
						addDeck({
							id: `A1.2 ${i + 1}`,
							name: `A1.2 ${i + 1}`,
							cards: vocabA12[i].map((card) => card.id),
						}),
					);

					for (let j = 0; j < vocabA12[i].length; j++) {
						dispatch(addCard({...vocabA12[i][j], deck: `A1.2 ${i + 1}`}));
					}
				}
			} else if (!settings.presetA12 && areDecksPresent) {
				const decksToDelete = decks.filter((deck) => deck?.id?.includes('A1.2'));

				for (let i = 0; i < decksToDelete.length; i++) {
					dispatch(deleteCards({cards: decksToDelete[i].cards}));
					dispatch(deleteDeck({id: decksToDelete[i].id}));
				}
			}
		}
	}, [settings, decks]);
};

export default usePresetVocab;
