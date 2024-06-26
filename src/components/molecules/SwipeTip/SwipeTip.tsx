import {Box, Text} from '@chakra-ui/react';
import {MdOutlineSwipeRight, MdOutlineSwipeLeft} from 'react-icons/md';

import styles from './SwipeTip.module.scss';
import {ISwipeTip} from './ISwipeTip.ts';

const SwipeTip = ({style, text}: ISwipeTip) => {
	return (
		<Box className={styles[`swipe__tips`]} sx={style}>
			<MdOutlineSwipeLeft size={30} />
			<Text as="p">{text}</Text>
			<MdOutlineSwipeRight size={30} />
		</Box>
	);
};

export default SwipeTip;
