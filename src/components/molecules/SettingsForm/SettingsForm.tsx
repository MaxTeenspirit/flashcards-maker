import {useEffect} from 'react';
import {Box, Stack, FormControl, FormLabel, Switch, Flex} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '@redux';
import {setPerfekt, setPrateritum, setA12} from '@slices';

const SettingsForm = () => {
	const {register, watch} = useForm();
	const dispatch = useDispatch();

	const settings = useSelector((state: RootState) => state.settings);

	const isPerfekt = watch('perfekt');
	const isPrateritum = watch('prateritum');
	const isA12 = watch('presetA12');

	useEffect(() => {
		if (typeof isPerfekt === 'boolean') {
			dispatch(setPerfekt(isPerfekt));
		}
	}, [isPerfekt, dispatch]);

	useEffect(() => {
		if (typeof isPrateritum === 'boolean') {
			dispatch(setPrateritum(isPrateritum));
		}
	}, [isPrateritum, dispatch]);

	useEffect(() => {
		if (typeof isA12 === 'boolean') {
			dispatch(setA12(isA12));
		}
	}, [isA12, dispatch]);

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
					<Flex alignItems="center" mb="0.6rem">
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
				<FormControl>
					<Flex alignItems="center">
						<Switch
							isChecked={settings.presetA12}
							id="presetA12"
							sx={{
								'.chakra-switch__track[data-checked]:not([data-theme])': {backgroundColor: '#FDAC04'},
							}}
							{...register('presetA12')}
						/>
						<FormLabel htmlFor="presetA12" m="0 0 0 1rem" cursor="pointer">
							Пресет-картки А1.2
						</FormLabel>
					</Flex>
				</FormControl>
			</Stack>
		</Box>
	);
};

export default SettingsForm;
