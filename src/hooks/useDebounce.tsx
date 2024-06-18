import {useEffect, useRef, useState} from 'react';

const useDebounce = <T,>(value?: T, delay = 500): T | undefined => {
	const [debouncedValue, setDebouncedValue] = useState<T | undefined>(value);
	const timerRef = useRef<number>();

	useEffect(() => {
		clearTimeout(timerRef.current);

		timerRef.current = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timerRef.current);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
