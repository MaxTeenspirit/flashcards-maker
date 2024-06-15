import {Modal} from '@atoms';

import SettingsForm from '../SettingsForm';
import {IModalMenu} from './IModalMenu.ts';

const ModalMenu = ({trigger}: IModalMenu) => {
	return (
		<Modal trigger={trigger} text={{title: 'Опції'}} isCloseButton>
			<SettingsForm />
		</Modal>
	);
};

export default ModalMenu;
