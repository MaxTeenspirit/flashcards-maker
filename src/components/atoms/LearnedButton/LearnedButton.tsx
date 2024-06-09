import {memo} from 'react';

import {Button} from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';

import {ILearnedButton} from './ILearnedButton.ts';

const LearnedButton = memo(({onLearned, isDisabled}: ILearnedButton) => {
	return (
		<Button
			isDisabled={isDisabled}
			onClick={onLearned}
			variant="ghost"
			leftIcon={<CloseIcon />}
			sx={{WebkitTapHighlightColor: 'transparent', WebkitFocusRingColor: 'transparent', outline: 'none'}}
		>
			Приховати слово
		</Button>
	);
});

export default LearnedButton;
