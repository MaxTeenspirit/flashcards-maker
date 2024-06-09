import {useState, useEffect} from 'react';
import {Flex, Link, HStack, IconButton, useMediaQuery} from '@chakra-ui/react';
import {HamburgerIcon} from '@chakra-ui/icons';

import {Icon, NavLink, IconCTA, Title} from '@atoms';
import {MobileMenu} from '@molecules';

import styles from './Header.module.scss';

const Header = () => {
	const basePath = import.meta.env.BASE_URL;

	const [isMobile] = useMediaQuery('(max-width: 768px)');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<Flex
			as="header"
			align="center"
			justify="space-between"
			padding={['1rem', '1rem 3rem']}
			borderBottom="1px solid #ccc"
			height={isScrolled && !isMobile ? ['70px', '90px', '120px'] : ['80px', '110px', '130px']}
			color="#E0E0E0"
			bg="#20293C"
			position="fixed"
			width="100%"
			zIndex={9}
			top="0"
			transition="height 0.2s ease-in-out, padding 0.3s ease-in-out"
		>
			<Flex alignItems="center">
				<Link
					display="flex"
					as={NavLink}
					to="/"
					sx={{WebkitTapHighlightColor: 'transparent', WebkitFocusRingColor: 'transparent', outline: 'none'}}
				>
					<Icon
						src={`${basePath}logo-100.png`}
						srcSet={`${basePath}logo-100.png 50w, ${basePath}logo-140.png 70w, ${basePath}logo-200.png 100w`}
						sizes="(max-width: 425px) 50px, (max-width: 768px) 70px, 100px"
						boxSize={isScrolled && !isMobile ? ['30px', '40px', '70px'] : ['50px', '70px', '100px']}
						transition="height 0.2s ease-in-out, width 0.2s ease-in-out"
					/>
				</Link>
				<Title />
			</Flex>
			<IconButton
				className={styles['header__mobile-menu-cta']}
				variant="unstiled"
				aria-label="Menu"
				sx={{WebkitTapHighlightColor: 'transparent', WebkitFocusRingColor: 'transparent', outline: 'none'}}
				icon={
					<HamburgerIcon
						color="#E0E0E0"
						boxSize={isScrolled && !isMobile ? ['20px', '30px', '50px'] : ['30px', '40px', '70px']}
						transition="height 0.2s ease-in-out, width 0.2s ease-in-out"
					/>
				}
				mr={2}
				onClick={toggleMenu}
			/>

			<HStack className={styles['header__cta-stack']}>
				<Link as={NavLink} to="/learn">
					<IconCTA text="Вчити" condition={isScrolled} iconName={'learn'} />
				</Link>
				<Link as={NavLink} to="/allCards">
					<IconCTA margin="0 1rem" text="Всі картки" condition={isScrolled && !isMobile} iconName={'all'} />
				</Link>
				<Link as={NavLink} to="/decks">
					<IconCTA text="Стеки" condition={isScrolled && !isMobile} iconName={'piles'} />
				</Link>
				<Link as={NavLink} to="/create">
					<IconCTA margin="0 0 0 1rem" text="Створити" condition={isScrolled && !isMobile} iconName={'add'} />
				</Link>
			</HStack>

			{!!isMobile && <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu}></MobileMenu>}
		</Flex>
	);
};

export default Header;
