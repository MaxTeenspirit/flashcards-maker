import {useState, useEffect, useRef, memo} from 'react';
import {AnimatePresence, useAnimation, useMotionValue, PanInfo} from 'framer-motion';
import {Box, Text, useToast} from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons';
import {MdOutlineSwipeRight, MdOutlineSwipeLeft} from 'react-icons/md';
import {GiAnticlockwiseRotation} from 'react-icons/gi';

import {MotionBox, LearnButton} from '@atoms';
import {FlipCard} from '@molecules';
import {getRandomIndexFromArray} from '@helpers';
import {IWord} from '@redux-types';

import styles from './LearnedCards.module.scss';

import {ILearnCards} from './ILearnCards.ts';

const LearnCards = memo(({words, isTranslationFirst}: ILearnCards) => {
	const [hidden, setHidden] = useState(false);
	const [index, setIndex] = useState(0);
	const [wordsToLearn, setWordsToLearn] = useState<IWord[]>(words);

	const prevIndexRef = useRef(0);
	const lastLearnedWordRef = useRef<(IWord & {index: number}) | null>(null);

	const toast = useToast();
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

	if (!wordsToLearn || !wordsToLearn?.length) {
		return null;
	}

	const showLearnedToast = () => {
		toast({
			title: 'Ви вивчили всі слова у стеку!',
			description: 'Оберіть інший стек, чи повторіть поточний стек!',
			status: 'success',
			duration: 4000,
			isClosable: true,
		});
	};

	const handleAnimationComplete = () => {
		const randomIndex = getRandomIndexFromArray(wordsToLearn, index);

		prevIndexRef.current = index;
		setHidden(true);
		setIndex(randomIndex);
	};

	const handleStartAnimation = (direction: 'left' | 'right') => {
		if (wordsToLearn.length <= 1) {
			showLearnedToast();

			return;
		}

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

	const handleLearned = () => {
		if (wordsToLearn.length <= 1) {
			showLearnedToast();
			return;
		}

		lastLearnedWordRef.current = {...wordsToLearn[index], index};

		const newWords = wordsToLearn.filter((word) => word?.id !== wordsToLearn[index].id);
		const randomIndex = getRandomIndexFromArray(newWords, index);

		prevIndexRef.current = index;
		setIndex(randomIndex);
		setWordsToLearn(newWords);
	};

	const handlePrevWord = () => {
		// If previous word was marked as learned and user wants to see it again
		if (lastLearnedWordRef?.current && prevIndexRef.current === lastLearnedWordRef?.current?.index) {
			const {index: lastLearnedIndex, ...rest} = lastLearnedWordRef.current;
			const newWordsToLearn = [...wordsToLearn];

			// Add the previously learned word back to its original position
			newWordsToLearn.splice(lastLearnedIndex, 0, rest);

			setWordsToLearn(newWordsToLearn);
			setIndex(lastLearnedIndex);

			lastLearnedWordRef.current = null;
			return;
		}

		// Otherwise, simply set the index to the previous index
		setIndex(prevIndexRef.current);
	};

	return (
		<Box className={styles['learned']}>
			<Box className={styles['learned__button']}>
				<LearnButton icon={<CheckIcon />} text="Вивчив" handleClick={handleLearned} />
				<LearnButton
					icon={<GiAnticlockwiseRotation size={20} />}
					text="Попереднє"
					handleClick={handlePrevWord}
				/>
			</Box>
			<Box className={styles['learned__tips']}>
				<MdOutlineSwipeLeft size={30} />
				<Text as="p">свайп для наступного слова</Text>
				<MdOutlineSwipeRight size={30} />
			</Box>
			<AnimatePresence>
				<MotionBox
					animate={controls}
					onAnimationComplete={handleAnimationComplete}
					drag="x"
					dragConstraints={{left: 0, right: 0}}
					onDragEnd={handleDragEnd}
					key={index}
				>
					{!hidden && <FlipCard isTranslationFirst={isTranslationFirst} word={wordsToLearn[index]} />}
				</MotionBox>
			</AnimatePresence>
		</Box>
	);
});

export default LearnCards;
