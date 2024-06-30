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

	const handleApprove = () => {
		if (typeof onApprove === 'function') {
			onApprove();
		}

		onClose();
	};

	return (
		<>
			<div onClick={onOpen}>{trigger}</div>

			<ModalUI isOpen={isOpen} onClose={onClose} size={['xs', 'sm', 'md', 'lg', 'xl']} isCentered>
				<ModalOverlay backdropFilter="blur(2px)" />
				<ModalContent>
					{!!isCloseButton && <ModalCloseButton zIndex="9" backgroundColor="white" />}
					{!!text?.title && <ModalHeader fontSize={['1.2rem', '1.4rem']}>{text.title}</ModalHeader>}
					<ModalBody padding="0.5rem 0rem">
						{children ? children : text?.message ? text.message : null}
					</ModalBody>
					<ModalFooter p="1rem 0.5rem">
						{!!text?.cancel && (
							<Button variant="ghost" onClick={onClose} sx={{textWrap: 'wrap'}}>
								{text.cancel}
							</Button>
						)}
						{!!text?.approve && (
							<Button colorScheme="red" onClick={handleApprove}>
								{text.approve}
							</Button>
						)}
					</ModalFooter>
				</ModalContent>
			</ModalUI>
		</>
	);
};

export default Modal;
