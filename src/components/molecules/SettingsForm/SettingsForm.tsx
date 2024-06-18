import {useEffect} from 'react';
import {Box, Stack, FormControl, FormLabel, Switch, Flex} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '@redux';
import {setPerfekt, setPrateritum} from '@slices';

const SettingsForm = () => {
	const {register, watch} = useForm();
	const dispatch = useDispatch();

	const settings = useSelector((state: RootState) => state.settings);

	const isPerfekt = watch('perfekt');
	const isPrateritum = watch('prateritum');

	useEffect(() => {
		dispatch(setPerfekt(isPerfekt));
	}, [isPerfekt, dispatch]);

	useEffect(() => {
		dispatch(setPrateritum(isPrateritum));
	}, [isPrateritum, dispatch]);

	return (
		<Box
			as="form"
			p="1.2rem"
			borderWidth={1}
			backgroundColor="#FFFEED"
			borderColor="#979DA8"
			borderRadius="md"
			maxWidth="680px"
			margin="0 auto"
		>
			<Stack spacing={2}>
				<FormControl>
					<Flex alignItems="center" mb="0.6rem">
						<Switch
							isChecked={settings.perfekt}
							id="perfekt"
							sx={{
								'.chakra-switch__track[data-checked]:not([data-theme])': {backgroundColor: '#FDAC04'},
							}}
							{...register('perfekt')}
						/>
						<FormLabel htmlFor="perfekt" m="0 0 0 1rem" cursor="pointer">
							Відображати Partizip II
						</FormLabel>
					</Flex>
				</FormControl>
				<FormControl>
					<Flex alignItems="center">
						<Switch
							isChecked={settings.prateritum}
							id="prateritum"
							{...register('prateritum')}
							sx={{
								'.chakra-switch__track[data-checked]:not([data-theme])': {backgroundColor: '#FDAC04'},
							}}
						/>
						<FormLabel htmlFor="prateritum" m="0 0 0 1rem" cursor="pointer">
							Відображати Präteritum
						</FormLabel>
					</Flex>
				</FormControl>
			</Stack>
		</Box>
	);
};

export default SettingsForm;
