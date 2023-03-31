import {React, useContext, useReducer, useState, useEffect, useMemo} from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import checkPropTypes from "../../utils/prop-types";
import {IngredientContext, OrderTotalContext} from "../../utils/userContext";
import {getIngredientsData} from "../../services/actions/ingredientsList";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {ADD_INGREDIENT, REMOVE_INGREDIENT, SORT_INGREDIENT} from "../../services/actions/constructorIngredients";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {CLOSE_CURRENT_INGREDIENT, OPEN_CURRENT_INGREDIENT} from "../../services/actions/currentIngredient";
import {createOrderId, GET_ORDER_SUCCESS, RESET_ORDER} from "../../services/actions/order";
import OptionalConstructorIngredients from "../optional-constructor-ingredients/optional-constructor-ingredients";




const BurgerConstructor = () => {
  const { optionalIngredients, bun } = useSelector((store) => ({
    optionalIngredients: store.constructorIngredients.optionalIngredients,
    bun: store.constructorIngredients.bun
  }));

  const { orderNumber, isOrderModalOpen } = useSelector((store) => ({
    orderNumber: store.order.orderNumber,
    isOrderModalOpen: store.order.isOrderModalOpen
  }));

  const dispatch = useDispatch();

  // calculate order sum
  let orderTotal = useMemo(
    () => {
      let result = 0;
      optionalIngredients.map(item => result += item.price);
      result = bun ? result + bun.price * 2 : result
      return result;
    },
    [optionalIngredients, bun]);

  // accumulate chosen ingredients id for sending to API
  const chosenIngredientsId = () => {
    return optionalIngredients.map(ingredient => ingredient._id)
  }

  // send order to API
  const orderUrl = 'https://norma.nomoreparties.space/api/orders';

  // order button handler
  const handleOrderButtonClick = () => {
    dispatch(createOrderId(orderUrl, chosenIngredientsId()))
  }

  // Adding DnD feature
  function handleDrop (ingredient) {
    dispatch({
      type: ADD_INGREDIENT,
      payload: ingredient,
      constructorIngredientId: ingredient._id + optionalIngredients.indexOf(ingredient)
    })
  }


  // ingredient drop
  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      handleDrop(ingredient);
    }
  });

  const handleCloseButton = () => {
    dispatch({type: RESET_ORDER})
  }

  return (<>
    <section ref={dropRef} className="pt-25 pl-8 pr-4">
      <div  className={burgerConstructorStyles.constructorContainer} >

        {bun !== null ?
          <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`ml-8 mr-6 ${burgerConstructorStyles.fixed}`}
        />
          : null
        }

        <ul className={`pr-4 ${burgerConstructorStyles.optionalIngredientsContainer}`}>

          {
            optionalIngredients.map((ingredient) => <OptionalConstructorIngredients key={`${ingredient._id}_${optionalIngredients.indexOf(ingredient)}`} ingredient={ingredient} ingredientIndex={optionalIngredients.indexOf(ingredient)} />)
          }

        </ul>

        {bun !== null ?
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`ml-8 mr-6 ${burgerConstructorStyles.fixed}`}
          />
          : null
        }

      </div>
      <div className={`pt-10 ${burgerConstructorStyles.orderTotal}`}>
        <div className={burgerConstructorStyles.price}>
          <p className="text text_type_digits-medium" >
            {orderTotal}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderButtonClick} >
          Оформить заказ
        </Button>
      </div>
    </section>

    {
      isOrderModalOpen &&
      <Modal children={<OrderDetails orderNumber={orderNumber} />} onClose={handleCloseButton}/>
    }
    </>
  )
}

export default BurgerConstructor;
//
// BurgerConstructor.propTypes = {
//   content: PropTypes.arrayOf(checkPropTypes),
//   openModal: PropTypes.func.isRequired,
//   setOrder: PropTypes.func.isRequired,
// }