import React from 'react';
import PropTypes from "prop-types";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyles from './ingredient-item.module.css';
import {useSelector} from "react-redux";

const IngredientItem= ({ ingredient, count }) => {


  //   const handleIngredientCardClick = () => {
  //   getCurrentIngredientId(iid);
  //   openModal();
  // }

  return (
      <li className={ingredientItemStyles.card} >
        <Counter count={count} size="default" extraClass="m-1" />
        <img src={ingredient.image} alt="Ингредиент космического бургера"/>
        <span className={`text text_type_digits-default pt-1 pb-1 ${ingredientItemStyles.price}`}>
          {ingredient.price}
          <CurrencyIcon type={"primary"} />
        </span>
        <p className={`${ingredientItemStyles.ingredientName}`}>{ingredient.name}</p>
      </li>
  )
}

export default IngredientItem;

// IngredientItem.propTypes = {
//   openModal: PropTypes.func.isRequired,
//   image: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   iid: PropTypes.string.isRequired,
//   count: PropTypes.number.isRequired,
// }