import React from 'react';
import PropTypes from "prop-types";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyles from './ingredient-item.module.css';
import { useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {NavLink, useLocation} from "react-router-dom";

const IngredientItem= ({ ingredient, openModalHandler }) => {
  const { constructorIngredients, bun } = useSelector((store) => ({
    constructorIngredients: store.constructorIngredients.optionalIngredients,
    bun: store.constructorIngredients.bun
  }));

  const location = useLocation();

  const count = ingredient.type !== "bun"
    ? constructorIngredients.reduce((accumulator, current) => {
    if (accumulator[current._id] !== undefined) {
      accumulator[current._id] += 1;
    } else {
      accumulator[current._id] = 1;
    }

    return accumulator;
  }, {})

  : bun ? { [bun._id]: 1 } : null;

    // Adding DnD feature
  const [{ isDragging}, dragRef] = useDrag({
    type: 'ingredients',
    item: { ...ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  return (
    <>
      <li ref={dragRef} onClick={openModalHandler} >
        <NavLink
          to={`/ingredients/${ingredient._id}`}
          state={ {background: location} }
          className={ingredientItemStyles.navLink}
        >
          { count && count[ingredient._id] && <Counter count={count[ingredient._id]} size="default" extraClass="m-1"/> }
          <img src={ingredient.image} alt={ingredient.name}/>
          <span className={`text text_type_digits-default pt-1 pb-1 ${ingredientItemStyles.price}`}>
            {ingredient.price}
            <CurrencyIcon type={"primary"} />
          </span>
          <p className={`${ingredientItemStyles.ingredientName} text text_type_main-small`}>{ingredient.name}</p>
        </NavLink>
      </li>
  </>
  )
}

export default IngredientItem;

IngredientItem.propTypes = {
  openModalHandler: PropTypes.func.isRequired,
  ingredient: PropTypes.object.isRequired,
}