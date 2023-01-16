import React from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyles from './ingredient-item.module.css';
// import { data } from '../../utils/data';

const IngredientsItem= (props) => {
  const { getIngredientId, openModal} = props;

  const handleIngredientCardClick = () => {
    openModal();
  }

  return (
      <li className={ingredientItemStyles.card} onClick={handleIngredientCardClick} iid={props.iid}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img src={props.image} alt="Ингредиент космического бургера"/>
        <span className={`text text_type_digits-default pt-1 pb-1 ${ingredientItemStyles.price}`}>
          {props.price}
          <CurrencyIcon />
        </span>
        <p className={`${ingredientItemStyles.ingredientName}`}>{props.name}</p>
      </li>
  )
}

export default IngredientsItem;