import {useState} from 'react';
import {Box, Heading, Link, Grid, GridItem} from '@chakra-ui/react';
// import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '@redux';

import {NavLink, Pagination} from '@atoms';
import {Deck} from '@molecules';

const Decks = () => {
	// const {deckId} = useParams();
	const {decks} = useSelector((state: RootState) => state.decks);

	const [currentPage, setCurrentPage] = useState(1);

	const isNoDecks = !decks || !decks.length;
	const itemsPerPage = 6;
	const totalPages = Math.ceil(decks.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentDecks = decks.slice(startIndex, startIndex + itemsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	if (isNoDecks) {
		return (
			<Box>
				<Heading as="h1">Стеки</Heading>
				<Heading as="h2" size="h2">
					<Link as={NavLink} to="/create/deck">
						Натисніть тут, щоб створити свій перший стек!
					</Link>
				</Heading>
			</Box>
		);
	}

	return (
		<Box>
			<Heading as="h1">Стеки</Heading>

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
				{currentDecks.map((deck) => (
					<GridItem key={deck?.id || deck?.name}>
						<Deck deck={deck} />
					</GridItem>
				))}
			</Grid>
			{decks?.length > itemsPerPage ? (
				<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
			) : null}
		</Box>
	);
};

export default Decks;
