import {useCallback, useEffect, ChangeEvent} from 'react';
import {Box} from '@chakra-ui/react';

import {removeArticle} from '@helpers';
import {SearchInput} from '@molecules';
import {ICard, IDeck} from '@redux-types';

import {useDebounce} from '../../../hooks';
import {ISearch} from './ISearch';

const Search = ({entities, setCards, setDecks, entityType, searchValue, setSearchValue, handlePageChange}: ISearch) => {
	const debouncedSearchValue = useDebounce(searchValue, 500);

	const search = useCallback(() => {
		const searchString = debouncedSearchValue ? removeArticle(debouncedSearchValue.toLowerCase()) : '';

		if (!searchString) {
			if (typeof setCards === 'function') {
				return setCards(entities as ICard[]);
			}

			if (typeof setDecks === 'function') {
				return setDecks(entities as IDeck[]);
			}
		}

		const filteredResults = entities.filter((entity) => {
			if ('word' in entity && searchString && entityType === 'card') {
				return (
					entity.word.toLowerCase().startsWith(searchString) ||
					entity?.translation?.toLowerCase()?.startsWith(searchString)
				);
			} else if ('name' in entity && searchString && entityType === 'deck') {
				return entity.name.toLowerCase().startsWith(searchString);
			}
			return false;
		}) as ICard[] | IDeck[];

		if (entityType === 'card' && setCards) {
			setCards(filteredResults as ICard[]);

			return;
		}
		if (entityType === 'deck' && setDecks) {
			setDecks(filteredResults as IDeck[]);

			return;
		}
	}, [debouncedSearchValue, entities, setCards, setDecks, entityType]);

	useEffect(() => {
		search();
	}, [debouncedSearchValue, search]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const clearInput = () => {
		setSearchValue('');
		setTimeout(() => handlePageChange(1), 500);
	};

	return (
		<Box mb={['1rem', '2rem', '2rem']}>
			<SearchInput
				value={searchValue}
				setValue={handleChange}
				clearInput={clearInput}
				placeholder={entityType === 'card' ? 'Пошук картки' : 'Пошук стеку'}
			/>
		</Box>
	);
};

export default Search;
