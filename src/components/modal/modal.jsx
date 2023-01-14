import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';
import OrderDetails from "../order-details/order-details";
import ingredientDetailsStyles from "../ingredient-details/ingredient-details.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = (props) => {
  const {children, onClose} = props;

  return (
      <div className={`pl-10 pr-10 pt-15 pb-15 ${modalStyles.modal}`}>
        <button className={modalStyles.closeButton}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
  );
}

export default Modal;