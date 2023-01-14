import React from 'react';
import ReactDOM from 'react-dom';
import Modal from "../modal/modal";
import modalOverlayStyles from './modal-overlay.module.css';
import IngredientDetails from "../ingredient-details/ingredient-details";

const modalRoot = document.getElementById("react-modals");

const onClose = () => {
  document.querySelector('overlay').classList.add('closed');
}

const ModalOverlay= (props) => {
  return ReactDOM.createPortal(
    (
      <div className={modalOverlayStyles.overlay}>
        <Modal children={<IngredientDetails />} onClose={onClose} />
      </div>
    ), modalRoot
  );
}

export default ModalOverlay;