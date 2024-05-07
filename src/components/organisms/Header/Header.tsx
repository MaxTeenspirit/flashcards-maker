import {useState} from 'react';
import {Box, Flex, Link, useMediaQuery} from '@chakra-ui/react';
import {HamburgerIcon} from '@chakra-ui/icons';

import {IconCTA} from '@atoms';
import {MobileMenu} from '@molecules';

const Header = () => {
	const [isMobile] = useMediaQuery('(max-width: 768px)');
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<Flex as="header" align="center" justify="space-between" padding="1rem" borderBottom="1px solid #ccc">
			<Box>
				{isMobile && <IconCTA iconComponent={<HamburgerIcon />} label="Menu" toggle={toggleMenu} />}
				<Link href="/">Home</Link>
			</Box>

			{!isMobile && (
				<Box>
					<Link href="/about">About</Link>
					<Link href="/services" ml={4}>
						Services
					</Link>
					<Link href="/contact" ml={4}>
						Contact
					</Link>
				</Box>
			)}

			<MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu}></MobileMenu>
		</Flex>
	);
};

export default Header;
