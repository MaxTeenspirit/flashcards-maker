import {useState, useRef, useEffect} from 'react';
import {Box, Text, Center, useMediaQuery} from '@chakra-ui/react';
import {useMotionValue, useTransform} from 'framer-motion';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

import {MotionBox} from '@atoms';

import {useGetVerbDataQuery} from 'redux/slices/dictionarySlice.ts';
import {useFitText} from '../../../hooks';
import {chooseBackgroundColor} from '@helpers';
import {IDictionaryData, IVerbData} from '@redux-types';
import {RootState} from '@redux';

import {IFlipCard} from './IFlipCard.ts';

const FlipCard = ({word, isTranslationFirst}: IFlipCard) => {
	const [flipped, setFlipped] = useState(false);
	const [isXSScreen] = useMediaQuery('(max-width: 360px)');

	const [dictionaryData, setDictionaryData] = useState<IVerbData>();

	const settings = useSelector((state: RootState) => state.settings);

	const {data: verbData} = useGetVerbDataQuery(word.word[0]?.toLowerCase(), {
		skip: !word?.word || word?.wordType !== 'verb',
	}) as {
		data: IDictionaryData | undefined;
		error: FetchBaseQueryError | SerializedError | undefined;
	};

	useEffect(() => {
		const wordValue = word?.word;
		const type = word?.wordType;

		if (!!word && type === 'verb' && verbData) {
			setDictionaryData(verbData[wordValue?.toLowerCase()]);
		}
	}, [word, word?.word, word?.wordType, verbData]);

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
		<Center h={['67vh', '60vh', '60vh']}>
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
						<Text
							ref={wordRef}
							as="p"
							color="#20293C"
							fontSize="1.8rem"
							whiteSpace="wrap"
							textAlign="center"
						>
							{isTranslationFirst
								? word.translation
								: `${word?.article ? word?.article + ' ' : ''}${word?.word}`}
						</Text>
						{!!isPlural && (
							<Text ref={pluralRef} as="p" fontSize="1.8rem">{`${word?.article ? 'die ' : ''}${
								word?.plural
							}`}</Text>
						)}
						{!!settings?.perfekt && !!dictionaryData?.perfekt && !isTranslationFirst && (
							<Text as="p" textAlign="left">
								<Text as="span" color="#919191">
									Part.II:{' '}
								</Text>
								{dictionaryData?.perfekt + '; '}
							</Text>
						)}
						{!!settings?.prateritum && !!dictionaryData?.prateritum && !isTranslationFirst && (
							<Text as="p" textAlign="left">
								<Text as="span" color="#919191">
									Prät.:{' '}
								</Text>
								{dictionaryData?.prateritum};
							</Text>
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
						<Text ref={translationRef} as="p" fontSize="1.8rem" whiteSpace="wrap" textAlign="center">
							{isTranslationFirst
								? `${word?.article ? word?.article + ' ' : ''}${word?.word}`
								: word.translation}
						</Text>
						{!!isTranslatedPlural && (
							<Text ref={pluralRef} as="p" fontSize="1.8rem">{`${word?.article ? 'die ' : ''}${
								word?.plural
							}`}</Text>
						)}
						{!!settings?.perfekt && !!dictionaryData?.perfekt && isTranslationFirst && (
							<Text as="p" textAlign="left">
								<Text as="span" color="#919191">
									Part.II:{' '}
								</Text>
								{dictionaryData?.perfekt + '; '}
							</Text>
						)}
						{!!settings?.prateritum && !!dictionaryData?.prateritum && isTranslationFirst && (
							<Text as="p" textAlign="left">
								<Text as="span" color="#919191">
									Prät.:{' '}
								</Text>
								{dictionaryData?.prateritum};
							</Text>
						)}
					</Box>
				</Box>
			</MotionBox>
		</Center>
	);
};

export default FlipCard;
