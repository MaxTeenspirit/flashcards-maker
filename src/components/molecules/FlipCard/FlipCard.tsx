import {useState, useRef} from 'react';
import {Box, Text, Center} from '@chakra-ui/react';
import {useMotionValue, useTransform} from 'framer-motion';

import {MotionBox} from '@atoms';

import {useFitText} from '../../../hooks';
import {chooseBackgroundColor} from '@helpers';

import {IFlipCard} from './IFlipCard.ts';

const FlipCard = ({word}: IFlipCard) => {
	const [flipped, setFlipped] = useState(false);
	const x = useMotionValue(0);
	const rotateY = useTransform(x, [-200, 0, 200], [15, 0, -15]);

	const wordRef = useRef<HTMLParagraphElement>(null);
	const pluralRef = useRef<HTMLParagraphElement>(null);
	const translationRef = useRef<HTMLParagraphElement>(null);

	const maxWidth = 300 / 16;
	const initialFontSize = 1.8;

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
					w="320px"
					h="400px"
					display="flex"
					alignItems="center"
					justifyContent="center"
					bg={chooseBackgroundColor(word)}
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
						<Text ref={wordRef} as="p" color="#20293C" fontSize="1.8rem">{`${
							word?.article ? word?.article + ' ' : ''
						}${word?.word}`}</Text>
						{!!word?.plural && (
							<Text ref={pluralRef} as="p" fontSize="1.8rem">{`${word?.article ? 'die ' : ''}${
								word?.plural
							}`}</Text>
						)}
					</Box>
					<Box
						sx={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
							backgroundColor: 'white',
							borderRadius: 'lg',
						}}
					>
						<Text ref={translationRef} fontSize="1.8rem">
							{word?.translation}
						</Text>
					</Box>
				</Box>
			</MotionBox>
		</Center>
	);
};

export default FlipCard;
