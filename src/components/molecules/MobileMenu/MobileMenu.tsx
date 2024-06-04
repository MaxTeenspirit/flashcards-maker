import {
	Drawer,
	DrawerOverlay,
	DrawerHeader,
	DrawerContent,
	DrawerCloseButton,
	HStack,
	DrawerBody,
	Link,
	Flex,
} from '@chakra-ui/react';

import {NavLink, IconCTA, Icon} from '@atoms';

import {IMobileMenu} from './IMobileMenu.ts';

const noTapColorSx = {
	WebkitTapHighlightColor: 'transparent',
	WebkitFocusRingColor: 'transparent',
	outline: 'none',
};

const MobileMenu = ({isOpen, toggleMenu}: IMobileMenu) => {
	return (
		<Drawer isOpen={isOpen} placement="right" size="xs" onClose={toggleMenu}>
			<DrawerOverlay backdropFilter="blur(2px)" />
			<DrawerContent backgroundColor="#F7FCFF" width={['290px!important', '310px!important', 'auto']}>
				<DrawerCloseButton />
				<DrawerHeader>
					<Flex alignItems="center" justifyContent="center" paddingTop="1rem" onClick={() => toggleMenu()}>
						<Link display="flex" as={NavLink} to="/" sx={noTapColorSx}>
							<Icon
								src="logo-100.png"
								srcSet="logo-100.png 50w, logo-140.png 70w, logo-200.png 100w"
								sizes="(max-width: 425px) 50px, (max-width: 768px) 70px, 100px"
								boxSize={['70px', '80px', '100px']}
								transition="height 0.2s ease-in-out, width 0.2s ease-in-out"
							/>
						</Link>
					</Flex>
				</DrawerHeader>
				<DrawerBody>
					<HStack display="flex" alignItems="start" flexDirection="column" marginTop="1rem">
						<Link as={NavLink} to="/learn" sx={noTapColorSx}>
							<IconCTA onClick={toggleMenu} margin="0 0 2rem 0" text="Вчити" iconName={'learn'} />
						</Link>
						<Link as={NavLink} to="/allCards" sx={noTapColorSx}>
							<IconCTA onClick={toggleMenu} margin="0 0 2rem 0" text="Всі картки" iconName={'all'} />
						</Link>
						<Link as={NavLink} to="/decks" sx={noTapColorSx}>
							<IconCTA onClick={toggleMenu} margin="0 0 2rem 0" text="Стеки" iconName={'piles'} />
						</Link>
						<Link as={NavLink} to="/create" sx={noTapColorSx}>
							<IconCTA onClick={toggleMenu} margin="0 0 2rem 0" text="Створити" iconName={'add'} />
						</Link>
					</HStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default MobileMenu;
