import {Button} from '@chakra-ui/react';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {useNavigate} from 'react-router-dom';

const BackButton = () => {
	const navigate = useNavigate();

	return (
		<Button
			variant="ghost"
			onClick={() => navigate(-1)}
			sx={{WebkitTapHighlightColor: 'transparent', WebkitFocusRingColor: 'transparent', outline: 'none'}}
		>
			<ArrowBackIcon boxSize={6} />
		</Button>
	);
};

export default BackButton;
