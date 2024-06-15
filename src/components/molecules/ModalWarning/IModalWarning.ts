import {ReactNode} from 'react';

import {ITextProp} from '../../atoms/Modal/IModal';

export interface IModalWarning {
	trigger: ReactNode;
	onApprove: () => void;
	text: ITextProp;
}
