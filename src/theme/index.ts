import {extendTheme, textDecoration} from '@chakra-ui/react';

const inputsVariants = {
	outline: {
		field: {
			border: '1px solid',
			borderColor: '#20293C',
			_hover: {
				borderColor: '#10B0E7',
			},
		},
	},
};

const components = {
	Heading: {
		baseStyle: {
			color: '#20293C',
			paddingBottom: ['1rem', '2rem', '3rem'],
			textAlign: 'center',
		},
	},
	Input: {
		variants: inputsVariants,
	},
	Select: {
		variants: inputsVariants,
	},
	Button: {
		baseStyle: {
			textTransform: 'uppercase',
		},
		variants: {
			solid: {
				backgroundColor: '#FDAC04',
				color: '#20293C',
				_hover: {color: '#20293C', bg: '#66C4F7'},
			},
		},
	},
};

const theme = extendTheme({components});

export default theme;
