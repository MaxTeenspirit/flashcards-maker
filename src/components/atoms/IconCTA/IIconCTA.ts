import {ReactElement} from 'react';

export interface IIconCTA {
	iconComponent: ReactElement;
	label: string;
	toggle: () => void;
}
