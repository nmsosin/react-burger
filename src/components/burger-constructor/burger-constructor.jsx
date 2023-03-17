import {React, useContext, useReducer, useState, useEffect, useMemo} from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import checkPropTypes from "../../utils/prop-types";
import {IngredientContext, OrderTotalContext} from "../../utils/userContext";
import {getIngredientsData} from "../../services/actions/ingredientsList";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {ADD_INGREDIENT, REMOVE_INGREDIENT} from "../../services/actions/constructorIngredients";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {OPEN_CURRENT_INGREDIENT} from "../../services/actions/currentIngredient";
import {createOrderId, GET_ORDER_SUCCESS} from "../../services/actions/order";
import OptionalConstructorIngredients from "../optional-constructor-ingredients/optional-constructor-ingredients";




const BurgerConstructor = () => {
  const { constructorIngredients } = useSelector((store) => ({
    constructorIngredients: store.constructorIngredients.constructorIngredients,
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

  // calculate order sum
  let orderTotal = useMemo(
    () => {
      let result = 0;
      constructorIngredients.map(item => {
        if (item.type === 'bun') {
          return result += item.price * 2;
        } else {
          return result += item.price;
        }
      });
      return result;
    },
    [constructorIngredients]);


  // console.log('buns:', buns)

  // accumulate chosen ingredients id for sending to API
  const chosenIngredientsId = () => {
    return constructorIngredients.map(ingredient => ingredient._id)
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
  const handleOrderButtonClick = () => {
    dispatch(createOrderId(orderUrl, chosenIngredientsId()))
  }

  // Adding DnD feature
  function handleDrop (ingredient) {
    dispatch({
      type: ADD_INGREDIENT,
      payload: ingredient
    })
  }

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
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

  const handleDelete = (ingredient) => {
    console.log('ingredient:', ingredient);
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: ingredient
    })
  }

  const [{ onSortHover}, dropSortRef] = useDrop({
    accept: "optionalIngredient",
    collect: (monitor) => ({
      onSortHover: monitor.isOver()
    }),
    drop(optionalIngredient) {
      console.log("optionalIngredient", optionalIngredient);
    }
  })

  console.log("onSortHover:", onSortHover);

  return (<>
    <section ref={dropRef} className="pt-25 pl-8 pr-4">
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

        <div  ref={dropSortRef} className={`pr-4 ${burgerConstructorStyles.optionalIngredientsContainer}`}>

          {
            additives.map((ingredient) => <OptionalConstructorIngredients ingredient={ingredient} ingredientIndex={constructorIngredients.indexOf(ingredient)} />)
          }

        </div>

        {buns[0] !== undefined ?
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${buns[0].name} (низ)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
            extraClass={`ml-8 mr-6 ${burgerConstructorStyles.fixed}`}
          />
          : <ConstructorElement
            type="bottom"
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
      <Modal children={<OrderDetails orderNumber={orderNumber} />} />
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