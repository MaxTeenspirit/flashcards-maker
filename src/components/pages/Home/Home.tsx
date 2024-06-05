import {Box, Heading, Text, Image, Flex, useMediaQuery, Button} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
	const [isTab] = useMediaQuery(['(max-width: 900px)']);
	const navigate = useNavigate();

	const navigateToLearn = () => navigate('/learn');
	const navigateToCreateCard = () => navigate('/create');
	const navigateToCreateDeck = () => navigate('/create/1');

	return (
		<Box padding={['0rem', '0rem', '0rem', '0 2rem', '0 6rem']}>
			<Flex
				justifyContent="space-between"
				alignItems={isTab ? 'center' : 'start'}
				flexDir={isTab ? 'column' : 'row'}
			>
				<Box>
					<Heading as="h1" textAlign="start" p={['2rem 0', '3rem 0', '4rem 0']}>
						Зручний інструмент вивчення слів німецької мови
					</Heading>
					{!!isTab && (
						<Image
							src="./asset1-600.png"
							boxSize={['150px', '200px', '280px', '320px', '350px', '400px', '500px']}
							margin="0 auto"
							objectFit="cover"
							style={{width: '150px', height: 'auto'}}
						/>
					)}
					<Text as="p" paddingTop="1rem">
						Створюйте картки слів, обʼєднуйте картки в стеки, вчіть слова приємно!
					</Text>
					{!!isTab && (
						<Flex
							marginTop={isTab ? '2rem' : '4rem'}
							width="95%"
							flexDir={isTab ? 'column' : 'row'}
							justifyContent="space-between"
							alignItems="center"
						>
							<Button onClick={navigateToLearn} margin={isTab ? '0 0 2rem 0' : '0 1rem 2rem 0'}>
								Вчити
							</Button>
							<Button onClick={navigateToCreateCard} margin={isTab ? '0 0 2rem 0' : '0 1rem 2rem 0'}>
								Cтворити картку
							</Button>
							<Button onClick={navigateToCreateDeck} margin={isTab ? '0 0 2rem 0' : '0 1rem 2rem 0'}>
								Створити стек
							</Button>
						</Flex>
					)}
					<Text as="p" paddingTop="1rem" paddingBottom={isTab ? '2rem' : '0'}>
						Зверніть увагу: cлова зберігаються лише у вас на пристрої і не сінхронізуються між пристроями. У
						разі очистки кешу браузера всі слова і стеки слів будуть видалені.
					</Text>
					{!isTab && (
						<Flex
							marginTop={isTab ? '2rem' : '4rem'}
							width="95%"
							flexDir={isTab ? 'column' : 'row'}
							justifyContent="space-between"
							alignItems="center"
						>
							<Button margin={isTab ? '0 0 2rem 0' : '0 1rem 2rem 0'}>Вчити</Button>
							<Button margin={isTab ? '0 0 2rem 0' : '0 1rem 2rem 0'}>Cтворити картку</Button>
							<Button margin={isTab ? '0 0 2rem 0' : '0 1rem 2rem 0'}>Створити стек</Button>
						</Flex>
					)}
				</Box>
				{!isTab && (
					<Image
						src="./asset1-600.png"
						boxSize={['150px', '200px', '280px', '320px', '350px', '400px', '500px']}
						marginTop="2rem"
						objectFit="cover"
						style={{width: '320px', height: 'auto'}}
					/>
				)}
			</Flex>
		</Box>
	);
};

export default Home;
