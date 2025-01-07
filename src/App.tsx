import {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Box} from '@chakra-ui/react';
import {useSelector} from 'react-redux';

import {RootState} from '@redux';
import {Wrapper, Header} from '@organisms';

import {usePresetVocab} from './hooks';

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	const settings = useSelector((state: RootState) => state.settings);
	const {decks} = useSelector((state: RootState) => state.decks);

	usePresetVocab(settings, decks);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location?.pathname]);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const redirect = urlParams.get('redirect');

		if (redirect && location.pathname !== redirect) {
			urlParams.delete('redirect');
			const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}${
				window.location.hash
			}`;
			window.history.replaceState(null, '', newUrl);
			navigate(redirect, {replace: true});
		}
	}, [navigate, location]);

	return (
		<Box position="relative" minHeight="100vh" bg="#F7FCFF">
			<Header />
			<Wrapper>
				<Outlet />
			</Wrapper>
		</Box>
	);
}

export default App;
