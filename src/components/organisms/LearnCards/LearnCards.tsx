import {useState, useEffect, useRef, memo} from 'react';
import {AnimatePresence, useAnimation, useMotionValue, PanInfo} from 'framer-motion';
import {Box, useToast} from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons';
import {GiAnticlockwiseRotation} from 'react-icons/gi';

import {MotionBox, LearnButton} from '@atoms';
import {FlipCard, SwipeTip} from '@molecules';
import {getRandomIndexFromArray} from '@helpers';
import {IWord} from '@redux-types';

import {useLastIndexes} from '../../../hooks';

import styles from './LearnedCards.module.scss';

import {ILearnCards} from './ILearnCards.ts';

const LearnCards = memo(({words, isTranslationFirst}: ILearnCards) => {
	const [hidden, setHidden] = useState(false);
	const [index, setIndex] = useState(0);
	const [wordsToLearn, setWordsToLearn] = useState<IWord[]>(words);

	const {lastIndexesRef, addIndexToLast} = useLastIndexes();

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
		const randomIndex = getRandomIndexFromArray(wordsToLearn, lastIndexesRef.current, index);

		prevIndexRef.current = index;
		setHidden(true);
		addIndexToLast(randomIndex);
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
		const randomIndex = getRandomIndexFromArray(newWords, lastIndexesRef.current, index);

		prevIndexRef.current = index;
		addIndexToLast(randomIndex);
		setIndex(randomIndex);
		setWordsToLearn(newWords);
	};

	const handlePrevWord = () => {
		if (lastLearnedWordRef?.current && prevIndexRef.current === lastLearnedWordRef?.current?.index) {
			const {index: lastLearnedIndex, ...rest} = lastLearnedWordRef.current;
			const newWordsToLearn = [...wordsToLearn];

			newWordsToLearn.splice(lastLearnedIndex, 0, rest);

			setWordsToLearn(newWordsToLearn);
			setIndex(lastLearnedIndex);

			lastLearnedWordRef.current = null;
			return;
		}

		setIndex(prevIndexRef.current);
	};

	return (
		<Box className={styles['learned']}>
			<Box className={styles['learned__button']}>
				<LearnButton icon={<CheckIcon />} text="Вивчено" handleClick={handleLearned} />
				<LearnButton
					icon={<GiAnticlockwiseRotation size={20} />}
					text="Попереднє"
					handleClick={handlePrevWord}
				/>
			</Box>
			<SwipeTip style={{bottom: '5%'}} text="свайп для наступного слова" />
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
