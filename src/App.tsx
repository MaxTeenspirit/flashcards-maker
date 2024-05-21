import {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {Box} from '@chakra-ui/react';

import {Header} from '@organisms';

function App() {
	const {pathname} = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<Box position="relative" minHeight="200vh" bg="#CFD8DC">
			<Header />
			<main>
				<Outlet />
			</main>
		</Box>
	);
}

export default App;
