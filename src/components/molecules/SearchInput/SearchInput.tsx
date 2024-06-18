import {InputGroup, InputRightElement, Input} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';

import {ISearchInput} from './ISearchInput.ts';

const SearchInput = ({value, setValue, placeholder}: ISearchInput) => {
	return (
		<InputGroup>
			<Input
				border="1px solid #20293C"
				variant="filled"
				fontSize="1.4rem"
				value={value}
				onChange={setValue}
				type="text"
				placeholder={placeholder}
			/>
			<InputRightElement pointerEvents="none">
				<SearchIcon color="#20293C" />
			</InputRightElement>
		</InputGroup>
	);
};

export default SearchInput;
