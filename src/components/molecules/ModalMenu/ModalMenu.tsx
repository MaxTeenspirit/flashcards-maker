import {Modal} from '@atoms';

import {IModalMenu} from './IModalMenu.ts';

const ModalMenu = ({trigger}: IModalMenu) => {
	return <Modal trigger={trigger} text={{title: '', approve: 'Зберігти'}}></Modal>;
};

export default ModalMenu;
