import {memo} from 'react';

import {Button} from '@chakra-ui/react';

import {ILearnButton} from './ILearnButton.ts';

const LearnButton = memo(({handleClick, isDisabled, text, icon}: ILearnButton) => {
	return (
		<Button
			isDisabled={isDisabled}
			onClick={handleClick}
			variant="ghost"
			leftIcon={icon}
			fontSize={['0.8rem', '0.8rem', '1rem']}
			sx={{WebkitTapHighlightColor: 'transparent', WebkitFocusRingColor: 'transparent', outline: 'none'}}
		>
			{!!text && text}
		</Button>
	);
});

export default LearnButton;
