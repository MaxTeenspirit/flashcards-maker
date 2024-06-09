import {ReactElement} from 'react';

export interface ILearnButton {
	handleClick: () => void;
	isDisabled?: boolean;
	text?: string;
	icon?: ReactElement;
}
