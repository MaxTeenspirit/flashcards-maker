import {useState, useEffect, useRef} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';

import {IDictionaryData, IVerbData} from '@redux-types';
import {useGetVerbDataQuery} from 'redux/slices/dictionarySlice.ts';
import {normalizeLetter} from '@helpers';

const useVerbDictionary = (verb: string, wordType: string) => {
	const [queryLetter, setQueryLetter] = useState('');
	const [verbDictData, setVerbDictData] = useState<IVerbData | null>();

	const prevLetterRef = useRef('');

	const {data: verbData, error} = useGetVerbDataQuery(queryLetter, {
		skip: !queryLetter || wordType !== 'verb',
	}) as {
		data: IDictionaryData | undefined;
		error: FetchBaseQueryError | SerializedError | undefined;
	};

	useEffect(() => {
		if (!!verbData && !error && !!verb) {
			const data = verbData[verb.toLowerCase()];

			if (data) {
				setVerbDictData(data);
			} else {
				setVerbDictData(null);
			}
		}
	}, [verbData, error, verb]);

	useEffect(() => {
		const lowerVerb = verb?.toLocaleLowerCase();

		if (lowerVerb?.length && prevLetterRef.current !== lowerVerb[0] && wordType === 'verb') {
			const normalizedLetter = normalizeLetter(lowerVerb[0]);

			prevLetterRef.current = normalizedLetter;

			setQueryLetter(normalizedLetter);
		} else {
			setQueryLetter('');
		}
	}, [verb, wordType]);

	return verbDictData;
};

export default useVerbDictionary;
