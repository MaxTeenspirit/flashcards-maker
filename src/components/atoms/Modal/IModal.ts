import {ReactNode} from 'react';

export interface ITextProp {
	title?: string;
	message?: string;
	cancel?: string;
	approve?: string;
}

export interface IModal {
	trigger: ReactNode;
	children?: ReactNode | string;
	isBackgroundClose?: boolean;
	isCloseButton?: boolean;
	onApprove?: () => void;
	onCancel?: () => void;
	text?: ITextProp;
}
