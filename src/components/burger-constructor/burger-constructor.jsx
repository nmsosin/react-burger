import {React, useContext, useReducer, useState, useEffect, useMemo} from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import checkPropTypes from "../../utils/prop-types";
import {IngredientContext, OrderTotalContext} from "../../utils/userContext";
import {getIngredientsData} from "../../services/actions/ingredientsList";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ADD_INGREDIENT, REMOVE_INGREDIENT} from "../../services/actions/constructorIngredients";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {OPEN_CURRENT_INGREDIENT} from "../../services/actions/currentIngredient";
import {createOrderId, GET_ORDER_SUCCESS} from "../../services/actions/order";




const BurgerConstructor = ({ setOrder }) => {
  const { constructorIngredients } = useSelector((store) => ({
    constructorIngredients: store.constructorIngredients.constructorIngredients,
    // isOrderModalOpen: store.constructorIngredients.isOrderModalOpen
  }));

  const { orderNumber, isOrderModalOpen } = useSelector((store) => ({
    orderNumber: store.order.orderNumber,
    isOrderModalOpen: store.order.isOrderModalOpen
  }));

  const dispatch = useDispatch();

  //memoize burger details
  const buns = useMemo(
    () => constructorIngredients.filter(item => item['type'] === 'bun'),
    [constructorIngredients]
  );

  const additives = useMemo(
    () => constructorIngredients.filter(item => item['type'] !== 'bun'),
    [constructorIngredients]
  );

  // specify chosen burger ingredients

  const chosenIngredients = buns.length === 0 ? [] : [].concat(buns[0], additives, buns[0]);

  // calculate order sum
  let orderTotal = useMemo(
    () => {
      let result = 0;
      constructorIngredients.map(item => {
        if ((buns.length === 0 && item.type === 'bun') || item.type !== 'bun') {
          result += item.price
        } else {
          return result;
        }
      });
      return result;
    },
    [constructorIngredients]);


  // console.log('buns:', buns)

  // accumulate chosen ingredients id for sending to API
  const chosenIngredientsId = () => {
    return chosenIngredients.map(ingredient => ingredient._id)
  }

  // send order to API
  const orderUrl = 'https://norma.nomoreparties.space/api/orders';
  // const checkResponse = (res) => {
  //   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  // };

  // const createOrder = async (url, options) => {
  //   try {
  //     const res = await fetch(orderUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         'ingredients': options,
  //       })
  //     });
  //     const result = await checkResponse(res);
  //     setOrder(result.order.number);
  //   } catch (err) {
  //     alert(`Ой! Не удалось оформить заказ: ${err}`);
  //   }
  // }

  // order button handler
  const handleOrderButtonClick = (evt) => {
    dispatch({ type: GET_ORDER_SUCCESS, payload: orderNumber })
    console.log(evt.currentTarget);
    // openModal();
    createOrderId(orderUrl, chosenIngredientsId());
    console.log(isOrderModalOpen);
    console.log(orderNumber);
  }

  // Adding DnD feature
  function handleDrop (ingredient) {
    dispatch({
      type: ADD_INGREDIENT,
      payload: ingredient
    })
  }

  function handleDelete (ingredient) {
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: ingredient
    })
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      console.log(ingredient)
      console.log(constructorIngredients.filter(item => item.type === 'bun')[0])
      if (ingredient.type === "bun" && !constructorIngredients.some(item => item.type === "bun")) {
        handleDrop(ingredient);
      } else if (ingredient.type === "bun" && ingredient._id !== constructorIngredients.filter(item => item.type === 'bun')[0]._id) {
        handleDelete(constructorIngredients.filter(item => item.type === 'bun')[0]);
        handleDrop(ingredient);
      } else if (ingredient.type !== "bun") {
        handleDrop(ingredient);
      }
    }
  });

  // console.log("isHover:" ,isHover);

  return (<>
    <section ref={dropTarget} style={{border: "3px solid red"}} className="pt-25 pl-8 pr-4">
      <div  className={burgerConstructorStyles.constructorContainer} >

        {buns[0] !== undefined ?
          <ConstructorElement
          type="top"
          isLocked={true}
          text={`${buns[0].name} (верх)`}
          price={buns[0].price}
          thumbnail={buns[0].image}
          extraClass={`ml-8 mr-6 ${burgerConstructorStyles.fixed}`}
        />
          : <ConstructorElement
            type="top"
            isLocked={true}
            text={`Выберите космобулку`}
            price={0}
            extraClass={`ml-8 mr-6 ${burgerConstructorStyles.fixed}`}
          />
        }

        <div className={`pr-4 ${burgerConstructorStyles.optionalIngredientsContainer}`}>

          {
            additives.map((ingredient) => {
              return (
                  <div className={burgerConstructorStyles.constructorElementContainer} key={`${ingredient._id}_${constructorIngredients.indexOf(ingredient)}`}>
                    <span className={`pr-2 ${burgerConstructorStyles.dragIcon}`}><DragIcon type="primary"/></span>
                    <ConstructorElement
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                      handleClose={handleDelete}
                    />
                  </div>
                )
            })
          }

        </div>

        {buns[0] !== undefined ?
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${buns[0].name} (низ)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
            extraClass={`ml-8 mr-6 ${burgerConstructorStyles.fixed}`}
          />
          : <ConstructorElement
            type="top"
            isLocked={true}
            text={`Выберите космобулку`}
            price={0}
            extraClass={`ml-8 mr-6 ${burgerConstructorStyles.fixed}`}
          />
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
      <Modal children={<OrderDetails />} />
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