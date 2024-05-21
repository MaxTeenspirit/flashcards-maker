import {Box} from '@chakra-ui/react';

import {IIcon} from './IIcon.ts';

const Icon = ({src, srcSet, alt = 'icon', sizes, boxSize, transition}: IIcon) => {
	return <Box as="img" src={src} srcSet={srcSet} sizes={sizes} boxSize={boxSize} alt={alt} transition={transition} />;
};

export default Icon;
