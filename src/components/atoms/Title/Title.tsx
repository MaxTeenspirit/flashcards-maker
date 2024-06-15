import {useNavigate} from 'react-router-dom';
import {Text} from '@chakra-ui/react';

const Title = () => {
	const navigate = useNavigate();
	return (
		<Text
			onClick={() => navigate('/')}
			as="h1"
			color="#f7fcff"
			fontSize={['1.6rem', '1.8rem', '2.2rem', '2.2rem']}
			cursor="pointer"
			padding={['0 0.5rem', '0 1rem', '0 1rem']}
			whiteSpace="nowrap"
			sx={{WebkitTapHighlightColor: 'transparent', WebkitFocusRingColor: 'transparent', outline: 'none'}}
		>
			FlashFluent DE
		</Text>
	);
};

export default Title;
