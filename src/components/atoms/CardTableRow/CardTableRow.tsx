import {Tr, Td, Text, Box} from '@chakra-ui/react';

import styles from './CardTableRow.module.scss';
import {ICardTableRow} from './ICardTableRow.ts';

const CardTableRow = ({card}: ICardTableRow) => {
	const {article, word, plural, translation} = card;

	return (
		<Tr>
			<Td width="50%" p={['0.5rem 0rem 0.5rem 1rem', '0.5rem 1rem 0.5rem 1.5rem']}>
				<Box className={styles['hide-scrollbars']} overflowX="auto" whiteSpace="nowrap" p="0.3rem 0">
					<Text as="p" fontSize={['1.1rem', '1.2rem', '1.2rem', '1.2rem']}>
						{article ? `${article} ${word}` : word}
					</Text>
					{plural ? (
						<Text
							as="p"
							fontSize={['1.1rem', '1.2rem', '1.2rem', '1.2rem']}
							marginTop="0.5rem"
						>{`die ${plural}`}</Text>
					) : null}
				</Box>
			</Td>
			<Td width="50%" p={['0.5rem 0.5rem 0.5rem 1rem', '0.5rem 1rem 0.5rem 1.5rem']}>
				<Box className={styles['hide-scrollbars']} overflowX="auto" whiteSpace="nowrap" p="0.3rem 0">
					<Text as="p" fontSize={['1.1rem', '1.2rem', '1.2rem', '1.2rem']}>
						{translation || ''}
					</Text>
				</Box>
			</Td>
		</Tr>
	);
};

export default CardTableRow;
