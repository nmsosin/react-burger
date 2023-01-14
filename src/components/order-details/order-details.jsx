import React from 'react';
import ReactDOM from "react-dom";
import {CloseIcon, CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetailsStyles from './order-details.module.css';


const OrderDetails = (props) => {

  return(
    <div className={orderDetailsStyles.orderModalContainer}>
      <button className={orderDetailsStyles.closeButton}>
        <CloseIcon type="primary" />
      </button>
      <h2>034536</h2>
      <span>идентификатор заказа</span>
      <div>
        <CheckMarkIcon type="primary" />
      </div>
      <p>Ваш заказ начали готовить</p>
      <p>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;