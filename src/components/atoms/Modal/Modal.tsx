import {
	Modal as ModalUI,
	Button,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	ModalHeader,
	ModalFooter,
	useDisclosure,
} from '@chakra-ui/react';

import {IModal} from './IModal.ts';

const Modal = ({trigger, onApprove, children, isCloseButton, text}: IModal) => {
	const {isOpen, onOpen, onClose} = useDisclosure();

	const {title, message, cancel, approve} = text;

	const handleApprove = () => {
		if (typeof onApprove === 'function') {
			onApprove();
		}

		onClose();
	};

	return (
		<>
			<div onClick={onOpen}>{trigger}</div>

			<ModalUI isOpen={isOpen} onClose={onClose} size={['xs', 'sm', 'md', 'xl']} isCentered>
				<ModalOverlay backdropFilter="blur(2px)" />
				<ModalContent>
					{!!isCloseButton && <ModalCloseButton />}
					{!!title && <ModalHeader fontSize={['1.2rem', '1.4rem']}>{title}</ModalHeader>}
					<ModalBody>{children ? children : message ? message : null}</ModalBody>
					<ModalFooter p="1rem 0.5rem">
						{!!cancel && (
							<Button variant="ghost" onClick={onClose} sx={{textWrap: 'wrap'}}>
								{cancel}
							</Button>
						)}
						{!!approve && (
							<Button colorScheme="red" onClick={handleApprove}>
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
