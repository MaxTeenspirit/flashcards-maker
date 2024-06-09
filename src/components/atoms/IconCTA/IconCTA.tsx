import {Box, Text, useMediaQuery} from '@chakra-ui/react';

import Icon from '../Icon/Icon.tsx';

import {IIconCTA} from './IIconCTA.ts';

const IconCTA = ({text, condition, iconName, margin, onClick}: IIconCTA) => {
	const basePath = import.meta.env.BASE_URL;

	const [isMobile] = useMediaQuery('(max-width: 768px)');

	return (
		<Box
			onClick={onClick}
			display="flex"
			flexDir={isMobile ? 'row' : 'column'}
			justifyContent="center"
			alignItems={isMobile ? 'start' : 'center'}
			margin={margin}
			sx={{
				'&:hover span': {
					textDecoration: 'underline',
				},
			}}
		>
			<Icon
				src={`${basePath}logo-100.png`}
				srcSet={`${basePath}${iconName}-100.png 50w, ${basePath}${iconName}-140.png 70w, ${basePath}${iconName}-200.png 100w`}
				sizes="(max-width: 425px) 50px, (max-width: 768px) 70px, 100px"
				boxSize={condition ? ['25px', '35px', '50px'] : isMobile ? ['65px'] : ['35px', '50px', '60px']}
				transition="height 0.2s ease-in-out, width 0.2s ease-in-out"
			/>
			<Text
				as="span"
				position={isMobile ? 'static' : 'absolute'}
				bottom="10px"
				opacity={condition ? 0 : 1}
				transform={condition ? 'translate(0, -20px)' : 'translate(0, 0)'}
				textAlign="center"
				transition="transform 0.2s ease-in-out, opacity 0.2s ease-in-out"
				color={isMobile ? '#20293C' : '#E0E0E0'}
				padding={isMobile ? '15px 0 5px 24px' : ''}
				fontSize={isMobile ? '1.4rem' : ''}
			>
				{text}
			</Text>
		</Box>
	);
};

export default IconCTA;
