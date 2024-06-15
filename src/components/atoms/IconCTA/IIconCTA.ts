export interface IIconCTA {
	condition?: boolean;
	text?: string;
	iconName: string;
	margin?: string | string[];
	onClick?: () => void;
}
