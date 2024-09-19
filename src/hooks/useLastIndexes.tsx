import {useRef} from 'react';

const useLastIndexes = () => {
	const lastIndexesRef = useRef<number[]>([]);

	const addIndexToLast = (num: number) => {
		const currentArray = lastIndexesRef.current;

		if (currentArray.length >= 5) {
			currentArray.shift();
		}

		currentArray.push(num);

		lastIndexesRef.current = currentArray;
	};

	return {
		lastIndexesRef,
		addIndexToLast,
	};
};

export default useLastIndexes;
