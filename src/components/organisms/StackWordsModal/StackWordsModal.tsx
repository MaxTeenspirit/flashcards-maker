import {useSelector} from 'react-redux';

import {Modal} from '@atoms';
import {StackTable} from '@molecules';
import {RootState} from '@redux';

import {IStackWordsModal} from './IStackWordsModal';

const StackWordsModal = ({children}: IStackWordsModal) => {
	const {cards} = useSelector((state: RootState) => state.cards);

	return (
		<Modal trigger={children} isCloseButton>
			<StackTable cards={cards} />
		</Modal>
	);
};

export default StackWordsModal;
