import {Modal} from '@atoms';

import {IModalWarning} from './IModalWarning.ts';

const ModalWarning = ({trigger, onApprove, text}: IModalWarning) => {
	return <Modal trigger={trigger} isCloseButton text={text} onApprove={onApprove} />;
};

export default ModalWarning;
