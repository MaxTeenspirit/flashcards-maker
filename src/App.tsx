import {Outlet} from 'react-router-dom';
import {Box} from '@chakra-ui/react';

import {Header} from '@organisms';

function App() {
	return (
		<Box>
			<Header />
			<main>
				<Outlet />
			</main>
		</Box>
	);
}

export default App;
