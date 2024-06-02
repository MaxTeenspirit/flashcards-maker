import {useEffect, useState, RefObject} from 'react';

const useFitText = (ref: RefObject<HTMLElement>, initialFontSize: number, maxWidth: number): number => {
	const [fontSize, setFontSize] = useState(initialFontSize);

	useEffect(() => {
		const element = ref.current;

		const updateFontSize = () => {
			if (element) {
				let newFontSize = initialFontSize;
				while (element.scrollWidth > maxWidth * 16 && newFontSize > 0) {
					newFontSize -= 0.1;
					element.style.fontSize = `${newFontSize}rem`;
				}
				setFontSize(newFontSize);
			}
		};

		updateFontSize();
		window.addEventListener('resize', updateFontSize);

		return () => window.removeEventListener('resize', updateFontSize);
	}, [ref, initialFontSize, maxWidth]);

	return fontSize;
};

export default useFitText;
