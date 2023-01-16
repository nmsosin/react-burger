import { React, useEffect, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import Modal from "../modal/modal";
import modalOverlayStyles from './modal-overlay.module.css';
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import checkPropTypes from "../../utils/prop-types";

const modalRoot = document.getElementById("react-modals");

const ModalOverlay = (props) => {
  const [isOrderDetailsOpen, setOrderDetailsIsOpen] = useState(false);
  const [isIngredientDetailsOpen, setIngredientDetailsIsOpen] = useState(false);

  const ingredientItems = props.content;

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      closeModal(evt);
    }
  }
  const openOrderModal = () => {
    setOrderDetailsIsOpen(props.orderModalOpened);
  }

  const openIngredientsModal = () => {
    setIngredientDetailsIsOpen(props.ingredientModalOpened)
  }

  useEffect(() => {
    openOrderModal();
  }, [props.orderModalOpened])

  useEffect(() => {
    openIngredientsModal();
  }, [props.ingredientModalOpened])


  const closeModal = () => {
    setOrderDetailsIsOpen(false);
    setIngredientDetailsIsOpen(false);
  }

  const handleCloseButton = (evt) => {
    console.log(evt.currentTarget);
    closeModal();
    evt.stopPropagation();
  }

  return ReactDOM.createPortal(
    (
      <>
        {
          isOrderDetailsOpen &&
          <div className={modalOverlayStyles.overlay}>
            <Modal children={<OrderDetails />} onClose={handleCloseButton} />
          </div>
        }

        {
          isIngredientDetailsOpen &&
          <div className={modalOverlayStyles.overlay}>
            <Modal children={<IngredientDetails items={ingredientItems} />} onClose={handleCloseButton} currentIngredientId={ingredientItems}/>
          </div>
        }
      </>
    ), modalRoot
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  content: PropTypes.arrayOf(checkPropTypes)
}