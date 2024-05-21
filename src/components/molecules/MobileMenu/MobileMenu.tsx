import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Link,
	DrawerFooter,
	Button,
} from '@chakra-ui/react';

import {IMobileMenu} from './IMobileMenu.ts';

const MobileMenu = ({isOpen, toggleMenu}: IMobileMenu) => {
	return (
		<Drawer isOpen={isOpen} placement="right" onClose={toggleMenu}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Menu</DrawerHeader>

				<DrawerBody>
					<Link href="/about" onClick={toggleMenu}>
						About
					</Link>
					<Link href="/services" onClick={toggleMenu} mt={4}>
						Services
					</Link>
					<Link href="/contact" onClick={toggleMenu} mt={4}>
						Contact
					</Link>
				</DrawerBody>

				<DrawerFooter>
					<Button variant="outline" onClick={toggleMenu}>
						Cancel
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default MobileMenu;
