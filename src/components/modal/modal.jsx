import React from 'react';
import modalStyles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";
import checkPropTypes from "../../utils/prop-types";
import childrenPropTypes from "../../utils/prop-types";

const Modal = (props) => {
  const {onClose} = props;

  return (
      <div className={`pl-10 pr-10 pt-15 pb-15 ${modalStyles.modal}`}>
        <button className={modalStyles.closeButton} onClick={onClose} >
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
  );
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element
}