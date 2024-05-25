import {Menu, MenuButton, MenuList, MenuItem, IconButton} from '@chakra-ui/react';
import {BsThreeDotsVertical} from 'react-icons/bs';

import {ICardMenu} from './ICardMenu.ts';

const CardMenu = ({children}: ICardMenu) => {
	return (
		<Menu>
			<MenuButton as={IconButton} icon={<BsThreeDotsVertical />} variant="ghost" aria-label="See menu" />
			<MenuList>{children}</MenuList>
		</Menu>
	);
};

CardMenu.Item = MenuItem;

export default CardMenu;
