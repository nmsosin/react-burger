import {FC, ReactNode, useEffect} from 'react';
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";

const modalRoot: HTMLElement = document.getElementById("react-modals") as HTMLElement;

type TModalProps = {
  onClose: () => void;
  children: ReactNode
}

const Modal: FC<TModalProps> = ({ onClose, children }) => {

  useEffect(() => {
    document.addEventListener('keydown', handleEscButton)

    return () => {
      document.removeEventListener('keydown', handleEscButton)
    }
  }, [])

  function handleEscButton (evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      onClose();
    }
  }

  return ReactDOM.createPortal(
    (
      <>
        <div className={modalStyles.modalWrapper} >
          <ModalOverlay closeModal={onClose}/>
          <div className={`pl-10 pr-10 pt-15 pb-15 ${modalStyles.modal}`}>
            <button className={modalStyles.closeButton} onClick={onClose} >
              <CloseIcon type="primary" />
            </button>
            {children}
          </div>
        </div>
      </>
    ), modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired
}