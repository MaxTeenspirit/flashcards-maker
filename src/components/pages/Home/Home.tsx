import {Box, Heading, Text, Image, Flex, useMediaQuery, Button} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

import styles from './Home.module.scss';

const Home = () => {
	const [isTab] = useMediaQuery(['(max-width: 900px)']);

	const navigate = useNavigate();

	const navigateToLearn = () => navigate('/learn');
	const navigateToCreateCard = () => navigate('/create');
	const navigateToCreateDeck = () => navigate('/create/1');
	return (
		<Box padding={['0rem', '0rem', '0rem', '0 2rem', '0 6rem']} className={styles['home']}>
			<Flex className={styles['home__text']} justifyContent="space-between">
				<Box>
					<Heading as="h1" textAlign="start" p={['2rem 0', '3rem 0', '4rem 0']}>
						Зручний інструмент вивчення слів німецької мови
					</Heading>
					<Image
						src="./asset1-600.png"
						boxSize={['150px', '200px', '280px', '320px', '350px', '400px', '500px']}
						margin="0 auto"
						objectFit="cover"
						style={{width: '150px', height: 'auto'}}
						className={styles['home__image_mobile']}
					/>
					<Text as="p" paddingTop="1rem">
						Створюйте картки слів, обʼєднуйте картки в стеки, вчіть слова приємно!
					</Text>
					<Flex
						width="95%"
						justifyContent="space-between"
						alignItems="center"
						className={styles['home__ctas_mobile']}
					>
						<Button onClick={navigateToLearn} margin={'0 0 2rem 0'}>
							Вчити
						</Button>
						<Button onClick={navigateToCreateCard} margin={'0 0 2rem 0'}>
							Cтворити картку
						</Button>
						<Button onClick={navigateToCreateDeck} margin={'0 0 2rem 0'}>
							Створити стек
						</Button>
					</Flex>

					<Text as="p" paddingTop="1rem" paddingBottom={isTab ? '2rem' : '0'}>
						Зверніть увагу: cлова зберігаються лише у вас на пристрої і не сінхронізуються між пристроями. У
						разі очистки кешу браузера всі слова і стеки слів будуть видалені.
					</Text>
					<Flex
						width="95%"
						justifyContent="space-between"
						alignItems="center"
						className={styles['home__ctas_desktop']}
					>
						<Button onClick={navigateToLearn} margin={'0 1rem 2rem 0'}>
							Вчити
						</Button>
						<Button onClick={navigateToCreateCard} margin={'0 1rem 2rem 0'}>
							Cтворити картку
						</Button>
						<Button onClick={navigateToCreateDeck} margin={'0 1rem 2rem 0'}>
							Створити стек
						</Button>
					</Flex>
				</Box>
				<Image
					src="./asset1-600.png"
					boxSize={['150px', '200px', '280px', '320px', '350px', '400px', '500px']}
					marginTop="2rem"
					objectFit="cover"
					className={styles['home__image_desktop']}
				/>
			</Flex>
		</Box>
	);
};

export default Home;
