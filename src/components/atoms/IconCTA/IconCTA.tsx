import {Box, Text} from '@chakra-ui/react';

import Icon from '../Icon/Icon.tsx';

import {IIconCTA} from './IIconCTA.ts';

const IconCTA = ({text, condition, iconName, margin}: IIconCTA) => {
	return (
		<Box
			display="flex"
			flexDir="column"
			justifyContent="center"
			alignItems="center"
			margin={margin}
			sx={{
				'&:hover span': {
					textDecoration: 'underline',
				},
			}}
		>
			<Icon
				src="logo-100.png"
				srcSet={`${iconName}-100.png 50w, ${iconName}-140.png 70w, ${iconName}-200.png 100w`}
				sizes="(max-width: 425px) 50px, (max-width: 768px) 70px, 100px"
				boxSize={condition ? ['25px', '35px', '50px'] : ['35px', '50px', '60px']}
				transition="height 0.2s ease-in-out, width 0.2s ease-in-out"
			/>
			<Text
				as="span"
				position="absolute"
				bottom="10px"
				opacity={condition ? 0 : 1}
				transform={condition ? 'translate(0, -20px)' : 'translate(0, 0)'}
				textAlign="center"
				transition="transform 0.2s ease-in-out, opacity 0.2s ease-in-out"
				color="#E0E0E0"
			>
				{text}
			</Text>
		</Box>
	);
};

export default IconCTA;
