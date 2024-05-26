import {useState} from 'react';
import {Box, Heading, Link, Grid, GridItem} from '@chakra-ui/react';
import {useSelector} from 'react-redux';

import {RootState} from '@redux';
import {NavLink, Pagination} from '@atoms';
import {Card} from '@molecules';

const AllCards = () => {
	const {cards} = useSelector((state: RootState) => state.cards);
	const [currentPage, setCurrentPage] = useState(1);

	const isNoCards = !cards || !cards.length;
	const itemsPerPage = 6;
	const totalPages = Math.ceil(cards.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentCards = cards.slice(startIndex, startIndex + itemsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	if (isNoCards) {
		return (
			<Box>
				<Heading as="h1">All Cards</Heading>
				<Heading as="h2" size="h2">
					<Link as={NavLink} to="/create">
						Click here to create your first card!
					</Link>
				</Heading>
			</Box>
		);
	}

	return (
		<Box>
			<Heading as="h1">All Cards</Heading>

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
			{cards?.length > itemsPerPage ? (
				<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
			) : null}
		</Box>
	);
};

export default AllCards;
