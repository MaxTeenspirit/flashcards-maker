import {Box, Heading, Link, Grid, GridItem} from '@chakra-ui/react';
import {useSelector} from 'react-redux';

import {RootState} from '@redux';
import {NavLink} from '@atoms';
import {Card} from '@molecules';

const AllCards = () => {
	const {cards} = useSelector((state: RootState) => state.cards);

	const isNoCards = !cards || !cards.length;

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
				templateColumns={{
					base: 'repeat(1, 1fr)',
					sm: 'repeat(1, 1fr)',
					md: 'repeat(1, 1fr)',
					lg: 'repeat(2, 1fr)',
					xl: 'repeat(2, 1fr)',
				}}
				gap={6}
			>
				{cards.map((card) => (
					<GridItem key={card?.id || card?.word}>
						<Card card={card} />
					</GridItem>
				))}
			</Grid>
		</Box>
	);
};

export default AllCards;
