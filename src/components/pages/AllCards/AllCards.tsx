import {useState, useEffect} from 'react';
import {Box, Heading, Link, Grid, GridItem, useMediaQuery} from '@chakra-ui/react';
import {useSelector} from 'react-redux';

import {RootState} from '@redux';
import {NavLink, Pagination} from '@atoms';
import {Card} from '@molecules';
import {Search} from '@organisms';
import {ICard} from '@redux-types';

const AllCards = () => {
	const [isMobile] = useMediaQuery('(max-width: 768px)');

	const {cards} = useSelector((state: RootState) => state.cards);
	const [currentPage, setCurrentPage] = useState(1);
	const [cardsToRender, setCardsToRender] = useState<ICard[]>(cards);
	const [searchValue, setSearchValue] = useState<string>('');

	const isNoCards = !cards || !cards.length;

	const itemsPerPage = isMobile ? 4 : 6;
	const totalPages = Math.ceil(cardsToRender.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentCards = cardsToRender.slice(startIndex, startIndex + itemsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		if (!cardsToRender?.length && cards?.length && !searchValue) {
			setCardsToRender(cards);
		}
		if (searchValue) {
			setCurrentPage(1);
		}
	}, [cardsToRender, cards, searchValue]);

	if (isNoCards) {
		return (
			<Box>
				<Heading as="h1">Всі картки</Heading>
				<Heading as="h2" size="h2">
					<Link as={NavLink} to="/create">
						Натисніть тут, щоб створити свою першу картку!
					</Link>
				</Heading>
			</Box>
		);
	}

	return (
		<Box>
			<Heading as="h1">Всі картки</Heading>
			<Search
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				entities={cards}
				entityType="card"
				setCards={setCardsToRender}
			/>

			{searchValue && !cardsToRender?.length && cards?.length ? (
				<Box>
					<Heading as="h2" size="h2" mt="4rem">
						Немає такої картки
					</Heading>
				</Box>
			) : null}

			{!!currentCards?.length && (
				<Grid
					mb="2rem"
					templateColumns={{
						base: 'repeat(1, 1fr)',
						sm: 'repeat(1, 1fr)',
						md: 'repeat(1, 1fr)',
						lg: 'repeat(2, 1fr)',
						xl: 'repeat(2, 1fr)',
					}}
					gap={6}
				>
					{currentCards.map((card) => (
						<GridItem key={card?.id || card?.word}>
							<Card card={card} />
						</GridItem>
					))}
				</Grid>
			)}
			{cardsToRender?.length > itemsPerPage ? (
				<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
			) : null}
		</Box>
	);
};

export default AllCards;
