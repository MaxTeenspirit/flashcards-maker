import {ReactNode} from 'react';

interface ITextProp {
	title?: string;
	message?: string;
	cancel?: string;
	approve?: string;
}

export interface IModal {
	trigger: ReactNode;
	onApprove: () => void;
	text: ITextProp;
}
