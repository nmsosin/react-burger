import React, {FC} from 'react';
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetailsStyles from './order-details.module.css';
import {useAppSelector} from "../../services/hooks/hooks";
import {getSentOrderDetails} from "../../utils/constants";
import {OrderPreloader} from "../order-preloader/order-preloader";

const OrderDetails: FC = () => {
 const {orderNumber, orderRequest, orderSent} = useAppSelector(getSentOrderDetails)


  return(

  <div className={orderDetailsStyles.orderModalContainer}>
    {orderRequest && <OrderPreloader text={"Заказ обрабатывается"} description={"Пожалуйста, ожидайте за поясом астероидов"}/>}
    {orderSent && orderNumber &&
      <>
        <h2 className={`text text_type_digits-large pt-15 pb-8 pl-15 pr-15 `}>{orderNumber}</h2>
        <span className={`text text_type_main-small pb-15 ${orderDetailsStyles.oderIdSubtitle}`}>идентификатор заказа</span>
        <div className={`m-5 ${orderDetailsStyles.checkmarkIconBackground}`}>
          <CheckMarkIcon type="primary"/>
        </div>
        <p className={`text text_type_main-small pt-15`}>Ваш заказ начали готовить</p>
        <p className={`text text_type_main-small text_color_inactive pt-2 pb-15`}>Дождитесь готовности на орбитальной
          станции</p>
    </>
}
  </div>
  );
}

export default OrderDetails;