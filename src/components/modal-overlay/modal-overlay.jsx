import { React, useEffect, useState, useMemo } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

import PropTypes from "prop-types";
import checkPropTypes from "../../utils/prop-types";


const ModalOverlay = ({ closeModal }) => {
  return(
      <>
          <div className={modalOverlayStyles.overlay} onClick={closeModal}>
          </div>
      </>
  );
}

export default ModalOverlay;
//
// ModalOverlay.propTypes = {
//   closeModal: PropTypes.func.isRequired
// }