import {useNavigate} from 'react-router-dom';
import {Text} from '@chakra-ui/react';

const Title = () => {
	const navigate = useNavigate();
	return (
		<Text
			onClick={() => navigate('/')}
			as="h1"
			color="#f7fcff"
			fontSize={['1.6rem', '2rem', '2rem', '3rem']}
			fontFamily="MaliRegular, sans-serif"
			cursor="pointer"
			padding="0 1rem"
		>
			FlashFluent DE
		</Text>
	);
};

export default Title;
