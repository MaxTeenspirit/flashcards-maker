import {TableContainer, Table, Thead, Tbody, Th, Tr, Box} from '@chakra-ui/react';

import {CardTableRow} from '@atoms';

import {IStackTable} from './IStackTable.ts';

const StackTable = ({deckName, cards}: IStackTable) => {
	return (
		<TableContainer>
			<Box maxHeight={['75vh', '90vh', '90vh']} overflowY="auto">
				<Table layout="fixed" width="100%">
					<Thead>
						<Tr backgroundColor="white">
							<Th width="50%" fontSize="1rem" p={['0.5rem 0rem 0.8rem 1rem', '1rem 1rem 1rem 1.5rem']}>
								{deckName}
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{cards.map((card) => (
							<CardTableRow card={card} key={card.id} />
						))}
					</Tbody>
				</Table>
			</Box>
		</TableContainer>
	);
};

export default StackTable;
