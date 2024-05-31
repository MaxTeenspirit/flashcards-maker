import {
	Button,
	Modal as ModalUI,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from '@chakra-ui/react';

import {IModal} from './IModal.ts';

const Modal = ({trigger, onApprove, text}: IModal) => {
	const {isOpen, onOpen, onClose} = useDisclosure();

	const {title, message, cancel, approve} = text;

	const handleDelete = () => {
		onApprove();
		onClose();
	};

	return (
		<>
			<div onClick={onOpen}>{trigger}</div>

			<ModalUI isOpen={isOpen} onClose={onClose} size={['xs', 'sm', 'md', 'xl']} isCentered>
				<ModalOverlay backdropFilter="blur(2px)" />
				<ModalContent>
					<ModalCloseButton />
					{!!title && <ModalHeader fontSize={['1.2rem', '1.4rem']}>{title}</ModalHeader>}
					{!!message && <ModalBody fontSize={['1rem', '1.2rem']}>{message}</ModalBody>}
					<ModalFooter>
						{!!cancel && (
							<Button variant="ghost" onClick={onClose} mr="1rem">
								{cancel}
							</Button>
						)}
						{!!approve && (
							<Button colorScheme="red" onClick={handleDelete}>
								{approve}
							</Button>
						)}
					</ModalFooter>
				</ModalContent>
			</ModalUI>
		</>
	);
};

export default Modal;
