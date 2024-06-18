import {useState, useEffect} from 'react';
import {Box, Heading, Link, Grid, GridItem} from '@chakra-ui/react';
import {useSelector} from 'react-redux';

import {RootState} from '@redux';
import {IDeck} from '@redux-types';
import {NavLink, Pagination} from '@atoms';
import {Deck} from '@molecules';
import {Search} from '@organisms';

const Decks = () => {
	const {decks} = useSelector((state: RootState) => state.decks);

	const [currentPage, setCurrentPage] = useState(1);
	const [decksToRender, setDecksToRender] = useState<IDeck[]>(decks);
	const [searchValue, setSearchValue] = useState<string>('');

	const isNoDecks = !decks || !decks.length;
	const itemsPerPage = 6;
	const totalPages = Math.ceil(decks.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentDecks = decksToRender.slice(startIndex, startIndex + itemsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		if (!decksToRender?.length && decks?.length && !searchValue) {
			setDecksToRender(decks);
		}
	}, [decksToRender, decks, searchValue]);

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
			<Search
				entities={decks}
				entityType="deck"
				searchValue={searchValue}
				setDecks={setDecksToRender}
				setSearchValue={setSearchValue}
			/>

			{searchValue && !decksToRender?.length && decks?.length ? (
				<Box>
					<Heading as="h2" size="h2" mt="4rem">
						Немає такого стеку
					</Heading>
				</Box>
			) : null}

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
