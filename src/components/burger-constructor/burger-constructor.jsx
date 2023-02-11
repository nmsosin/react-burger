import {React, useContext, useReducer, useState, useEffect, useMemo} from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import checkPropTypes from "../../utils/prop-types";
import {IngredientContext, OrderTotalContext} from "../../utils/userContext";




const BurgerConstructor = ({ openModal, setOrder }) => {
  const items = useContext(IngredientContext);

  //memoize burger details

  const buns = useMemo(
    () => items.filter(item => item.type === 'bun'),
    [items]
  );

  const additives = useMemo(
    () => items.filter(item => item.type !== 'bun'),
    [items]
  );

  // specify chosen burger ingredients
  const randomIndex = Math.floor(Math.random() * 2);

  const chosenIngredients = [].concat(buns[randomIndex], additives, buns[randomIndex]);


  // calculate order sum
  let orderTotal = useMemo(
    () => {
      let result = 0;
      chosenIngredients.map(item => result += item.price);
      return result;
    },
    [chosenIngredients]);

  //TODO: try to use reducer for order total calculation
  //
  // const initialState = { orderTotal: 0 };
  //
  // let orderTotal = useContext(OrderTotalContext);
  // const [state, dispatch] = useReducer(reducer, initialState);
  //
  // function reducer (state, action) {
  //   return { orderTotal: state.orderTotal };
  // }
  //

  // accumulate chosen ingredients id for sending to API
  const chosenIngredientsId = () => {
    return chosenIngredients.map(ingredient => ingredient._id)
  }

  // send order to API
  const orderUrl = 'https://norma.nomoreparties.space/api/orders';
  const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };
  const createOrder = async (url, options) => {
    try {
      const res = await fetch(orderUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'ingredients': options,
        })
      });
      const result = await checkResponse(res);
      setOrder(result.order.number);
    } catch (err) {
      alert(`Ой! Не удалось оформить заказ: ${err}`);
    }
  }

  // order button handler
  const handleOrderButtonClick = (evt) => {
    console.log(evt.currentTarget);
    openModal();
    createOrder(orderUrl, chosenIngredientsId());
  }





  return (
    <section className="pt-25 pl-8 pr-4">
      <div  className={burgerConstructorStyles.constructorContainer} >

          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${buns[randomIndex].name} (верх)`}
            price={buns[randomIndex].price}
            thumbnail={buns[randomIndex].image}
            extraClass={`ml-8 mr-6 ${burgerConstructorStyles.fixed}`}
          />

        <div className={`pr-4 ${burgerConstructorStyles.optionalIngredientsContainer}`}>

          {
            additives.map((ingredient) => {
                return (
                  <div className={burgerConstructorStyles.constructorElementContainer}>
                    <span className={`pr-2 ${burgerConstructorStyles.dragIcon}`}><DragIcon type="primary"/></span>
                    <ConstructorElement
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                    />
                  </div>
                )
            })
          }

        </div>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${buns[randomIndex].name} (низ)`}
          price={buns[randomIndex].price}
          thumbnail={buns[randomIndex].image}
          extraClass={`ml-8 mr-6 ${burgerConstructorStyles.fixed}`}
        />

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
  )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  content: PropTypes.arrayOf(checkPropTypes).isRequired,
  openModal: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
}