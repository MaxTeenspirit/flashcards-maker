import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from '@chakra-ui/react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {RouterProvider} from 'react-router-dom';

import {persistor, store} from './redux/store';
import {router} from './router';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<RouterProvider router={router} />
				</PersistGate>
			</Provider>
		</ChakraProvider>
	</React.StrictMode>,
);
