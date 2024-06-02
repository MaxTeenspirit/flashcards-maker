import {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {Box} from '@chakra-ui/react';

import {Wrapper, Header} from '@organisms';

function App() {
	const {pathname} = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<Box position="relative" minHeight="100vh" bg="#EAEAEA">
			<Header />
			<Wrapper>
				<Outlet />
			</Wrapper>
		</Box>
	);
}

export default App;
