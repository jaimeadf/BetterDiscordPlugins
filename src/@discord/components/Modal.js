import { WebpackModules } from '@zlibrary/api';

const {
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalListContent,
    ModalRoot,
    ModalSize,
    default: Modal
} = WebpackModules.getByProps('ModalRoot');

export { ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalListContent, ModalRoot, ModalSize };

export default Modal;
