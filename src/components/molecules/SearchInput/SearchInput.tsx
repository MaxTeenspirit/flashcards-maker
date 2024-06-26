import {InputGroup, InputRightElement, Input, Button} from '@chakra-ui/react';
import {SearchIcon, CloseIcon} from '@chakra-ui/icons';

import {ISearchInput} from './ISearchInput.ts';

const SearchInput = ({value, setValue, clearInput, placeholder}: ISearchInput) => {
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
			<InputRightElement>
				{!value ? (
					<SearchIcon color="#20293C" />
				) : (
					<Button variant="unstyled" onClick={clearInput}>
						<CloseIcon color="#20293C" />
					</Button>
				)}
			</InputRightElement>
		</InputGroup>
	);
};

export default SearchInput;
