import {extendTheme} from '@chakra-ui/react';

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
		sizes: {
			h2: {
				fontSize: ['1rem', '1.5rem', '2rem'],
			},
			h4: {
				paddingBottom: '0',
				fontSize: ['1.1rem', '1.2rem', '1.5rem'],
			},
		},
	},
	Text: {
		baseStyle: {
			color: '#6F6F6F',
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
			outline: {
				background: '#FAFAFA',
			},
		},
	},
};

const theme = extendTheme({components});

export default theme;
