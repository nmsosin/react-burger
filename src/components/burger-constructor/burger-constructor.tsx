import {FC, useMemo, useState} from 'react';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import {useDrop} from "react-dnd";
import {
  RESET_INGREDIENT,
  addConstructorIngredient
} from "../../services/actions/constructorIngredients";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {createOrderId, RESET_ORDER} from "../../services/actions/order";
import OptionalConstructorIngredients from "../optional-constructor-ingredients/optional-constructor-ingredients";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from "react-router-dom";
import {getConstructorIngredients, getSentOrderDetails, getUserInfo} from "../../utils/constants";
import {LOGIN_PAGE_ROUTE} from "../../utils/routes";
import {TIngredient} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";

const BurgerConstructor: FC = () => {
  const { optionalIngredients, bun } = useAppSelector(getConstructorIngredients);

  const { isSentOrderModalOpen } = useAppSelector(getSentOrderDetails);

  const user = useAppSelector(getUserInfo)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    const optionalIngredientsId = optionalIngredients.map(ingredient => ingredient._id);
    return bun ? [bun._id, ...optionalIngredientsId] : optionalIngredientsId;
  }

  // send order to API
  const handleOrderButtonClick = () => {
    if (user && user.name) {
      dispatch(createOrderId('orders', chosenIngredientsId()))
    } else {
      navigate(LOGIN_PAGE_ROUTE);
    }
  }

  // Adding DnD feature
  function handleDrop (ingredient: TIngredient) {
    dispatch(addConstructorIngredient(ingredient, uuidv4()))
  }

  // ingredient drop
  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      handleDrop(ingredient as TIngredient);
    }
  });

  const handleCloseButton = () => {
    dispatch({type: RESET_ORDER})
    dispatch({type: RESET_INGREDIENT})
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
            optionalIngredients.map((ingredient) => <OptionalConstructorIngredients key={ingredient.constructorIngredientId} ingredient={ingredient} ingredientIndex={optionalIngredients.indexOf(ingredient)} />)
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
        { bun
          ? <Button htmlType="button" type="primary" size="large" onClick={handleOrderButtonClick}>
          Оформить заказ
        </Button>
          : <Button htmlType="button" type="primary" size="large" onClick={handleOrderButtonClick} disabled>
            Выберите космобулку
          </Button>}
      </div>
    </section>

    {
      isSentOrderModalOpen &&
      <Modal children={<OrderDetails />} onClose={handleCloseButton}/>
    }
    </>
  )
}

export default BurgerConstructor;