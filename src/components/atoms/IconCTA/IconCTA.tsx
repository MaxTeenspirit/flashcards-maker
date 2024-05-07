import {IconButton} from '@chakra-ui/react';

import {IIconCTA} from './IIconCTA.ts';

const IconCTA = ({iconComponent, label = 'Button', toggle}: IIconCTA) => {
	return <IconButton aria-label={label} icon={iconComponent} size="md" mr={2} onClick={toggle} />;
};

export default IconCTA;
