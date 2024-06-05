import {useState, useRef} from 'react';
import {Box, Text, Center, useMediaQuery} from '@chakra-ui/react';
import {useMotionValue, useTransform} from 'framer-motion';

import {MotionBox} from '@atoms';

import {useFitText} from '../../../hooks';
import {chooseBackgroundColor} from '@helpers';

import {IFlipCard} from './IFlipCard.ts';

const FlipCard = ({word, isTranslationFirst}: IFlipCard) => {
	const [flipped, setFlipped] = useState(false);
	const [isXSScreen] = useMediaQuery('(max-width: 360px)');

	const x = useMotionValue(0);
	const rotateY = useTransform(x, [-200, 0, 200], [15, 0, -15]);

	const wordRef = useRef<HTMLParagraphElement>(null);
	const pluralRef = useRef<HTMLParagraphElement>(null);
	const translationRef = useRef<HTMLParagraphElement>(null);

	const maxWidth = 300 / 16;
	const initialFontSize = 1.8;

	const isPlural = !!word?.plural && word?.wordType === 'noun' && !isTranslationFirst;
	const isTranslatedPlural = !!word?.plural && word?.wordType === 'noun' && isTranslationFirst;

	useFitText(wordRef, initialFontSize, maxWidth);
	useFitText(pluralRef, initialFontSize, maxWidth);
	useFitText(translationRef, initialFontSize, maxWidth);

	const handleFlip = () => {
		setFlipped(!flipped);
	};

	return (
		<Center h="70vh">
			<MotionBox
				style={{perspective: 1000, x, rotateY}}
				onClick={handleFlip}
				initial={{opacity: 0, scale: 0.8}}
				transition={{duration: 0.4, x: {duration: 1}, stiffness: 300, damping: 30}}
				animate={{
					opacity: 1,
					scale: 1,
				}}
			>
				<Box
					w={isXSScreen ? '270px' : '320px'}
					h={isXSScreen ? '350px' : '400px'}
					display="flex"
					alignItems="center"
					justifyContent="center"
					bg={isTranslationFirst ? 'white' : chooseBackgroundColor(word)}
					color="white"
					fontSize="2xl"
					borderWidth={1}
					borderColor="#979DA8"
					borderRadius="lg"
					cursor="pointer"
					sx={{
						transformStyle: 'preserve-3d',
						transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
						transition: 'transform 0.6s',
						position: 'relative',
						WebkitTapHighlightColor: 'transparent',
						WebkitFocusRingColor: 'transparent',
						outline: 'none',
					}}
				>
					<Box
						sx={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDir: 'column',
							backfaceVisibility: 'hidden',
						}}
					>
						<Text ref={wordRef} as="p" color="#20293C" fontSize="1.8rem">
							{isTranslationFirst
								? word.translation
								: `${word?.article ? word?.article + ' ' : ''}${word?.word}`}
						</Text>
						{!!isPlural && (
							<Text ref={pluralRef} as="p" fontSize="1.8rem">{`${word?.article ? 'die ' : ''}${
								word?.plural
							}`}</Text>
						)}
					</Box>
					<Box
						backgroundColor={isTranslationFirst ? chooseBackgroundColor(word) : 'white'}
						sx={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDir: 'column',
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
							borderRadius: 'lg',
						}}
					>
						<Text ref={translationRef} as="p" fontSize="1.8rem">
							{isTranslationFirst
								? `${word?.article ? word?.article + ' ' : ''}${word?.word}`
								: word.translation}
						</Text>
						{!!isTranslatedPlural && (
							<Text ref={pluralRef} as="p" fontSize="1.8rem">{`${word?.article ? 'die ' : ''}${
								word?.plural
							}`}</Text>
						)}
					</Box>
				</Box>
			</MotionBox>
		</Center>
	);
};

export default FlipCard;
