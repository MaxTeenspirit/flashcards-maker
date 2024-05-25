import {Box, useMediaQuery} from '@chakra-ui/react';

import {IInputWrapper} from './IInputWrapper.ts';

const InputWrapper = ({children, shouldMobileColumn = true}: IInputWrapper) => {
	const [isMobile] = useMediaQuery('(max-width: 768px)');

	return (
		<Box display="flex" flexDirection={isMobile && shouldMobileColumn ? 'column' : 'row'} alignItems="center">
			{children}
		</Box>
	);
};

export default InputWrapper;
