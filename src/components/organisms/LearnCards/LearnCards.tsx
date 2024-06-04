import {useState, useEffect} from 'react';
import {AnimatePresence, useAnimation, useMotionValue, PanInfo} from 'framer-motion';

import {MotionBox} from '@atoms';
import {FlipCard} from '@molecules';
import {getRandomIndexFromArray} from '@helpers';

import {ILearnCards} from './ILearnCards.ts';

const LearnCards = ({words, isTranslationFirst}: ILearnCards) => {
	const [hidden, setHidden] = useState(false);
	const [index, setIndex] = useState(0);

	const controls = useAnimation();
	const x = useMotionValue(0);

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	useEffect(() => {
		setHidden(false);
	}, [index]);

	if (!words || !words?.length) {
		return null;
	}

	const handleAnimationComplete = () => {
		setHidden(true);
		setIndex(getRandomIndexFromArray(words, index));
	};

	const handleStartAnimation = (direction: 'left' | 'right') => {
		controls.start({
			x: direction === 'left' ? '-100vw' : '100vw',
			rotate: direction === 'left' ? -180 : 180,
			transition: {duration: 0.3, ease: 'easeInOut'},
		});
	};

	const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
		if (info.offset.x > 30) {
			handleStartAnimation('right');
		} else if (info.offset.x < -30) {
			handleStartAnimation('left');
		} else {
			x.set(0);
		}
	};

	return (
		<AnimatePresence>
			<MotionBox
				animate={controls}
				onAnimationComplete={handleAnimationComplete}
				drag="x"
				dragConstraints={{left: 0, right: 0}}
				onDragEnd={handleDragEnd}
				key={index}
			>
				{!hidden && <FlipCard isTranslationFirst={isTranslationFirst} word={words[index]} />}
			</MotionBox>
		</AnimatePresence>
	);
};

export default LearnCards;
