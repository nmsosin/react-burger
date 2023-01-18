import React from 'react';
import PropTypes from "prop-types";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyles from './ingredient-item.module.css';

const IngredientsItem= ({ openModal, image, price, name, iid, getCurrentIngredientId }) => {
    const handleIngredientCardClick = () => {
    getCurrentIngredientId(iid);
    openModal();
  }

  return (
      <li className={ingredientItemStyles.card} onClick={handleIngredientCardClick}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img src={image} alt="Ингредиент космического бургера"/>
        <span className={`text text_type_digits-default pt-1 pb-1 ${ingredientItemStyles.price}`}>
          {price}
          <CurrencyIcon type={"primary"} />
        </span>
        <p className={`${ingredientItemStyles.ingredientName}`}>{name}</p>
      </li>
  )
}

export default IngredientsItem;

IngredientsItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  iid: PropTypes.string.isRequired
}