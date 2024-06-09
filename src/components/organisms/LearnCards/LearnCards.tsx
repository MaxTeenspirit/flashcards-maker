import {useState, useEffect, memo} from 'react';
import {useNavigate} from 'react-router-dom';
import {AnimatePresence, useAnimation, useMotionValue, PanInfo} from 'framer-motion';
import {Box, Text, useToast} from '@chakra-ui/react';
import {ArrowLeftIcon, ArrowRightIcon} from '@chakra-ui/icons';

import {MotionBox, LearnedButton} from '@atoms';
import {FlipCard} from '@molecules';
import {getRandomIndexFromArray} from '@helpers';

import styles from './LearnedCards.module.scss';

import {ILearnCards} from './ILearnCards.ts';

const LearnCards = memo(({words, isTranslationFirst}: ILearnCards) => {
	const [hidden, setHidden] = useState(false);
	const [index, setIndex] = useState(0);
	const [wordsToLearn, setWordsToLearn] = useState(words);

	const navigate = useNavigate();
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

	const handleAnimationComplete = () => {
		setHidden(true);
		setIndex(getRandomIndexFromArray(wordsToLearn, index));
	};

	const handleStartAnimation = (direction: 'left' | 'right') => {
		if (wordsToLearn.length <= 1) {
			toast({
				title: 'Ви вивчили всі слова у стеку!',
				description: 'Оберіть інший стек, чи повторіть поточний стек!',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});

			navigate('/learn');
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
			return;
		}

		const newWords = wordsToLearn.filter((word) => word?.id !== wordsToLearn[index].id);

		setIndex(getRandomIndexFromArray(newWords, index));
		setWordsToLearn(newWords);
	};

	return (
		<Box className={styles['learned']}>
			<Box className={styles['learned__button']}>
				<LearnedButton onLearned={handleLearned} isDisabled={wordsToLearn.length <= 1} />
			</Box>
			<Box className={styles['learned__tips']}>
				<ArrowLeftIcon />
				<Text as="p">Свайп для наступного слова</Text>
				<ArrowRightIcon />
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
