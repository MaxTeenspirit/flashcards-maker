import {Box} from '@chakra-ui/react';

import {IWrapper} from './IWrapper.ts';

const Wrapper = ({children}: IWrapper) => {
	return (
		<Box as="main" padding={['6rem 1.5rem 1rem', '8rem 3rem 2rem', '10rem 8rem 2rem']}>
			{children}
		</Box>
	);
};

export default Wrapper;
