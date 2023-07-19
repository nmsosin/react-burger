import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyles from './ingredient-item.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {OPEN_CURRENT_INGREDIENT, CLOSE_CURRENT_INGREDIENT} from "../../services/actions/currentIngredient";
import {NavLink, useLocation} from "react-router-dom";

const IngredientItem= ({ ingredient, openModalHandler }) => {
  const { constructorIngredients, bun } = useSelector((store) => ({
    constructorIngredients: store.constructorIngredients.optionalIngredients,
    bun: store.constructorIngredients.bun
  }));

  const dispatch = useDispatch();
  const location = useLocation();

  const count = ingredient.type !== "bun"
    ? constructorIngredients.reduce((accumulator, current) => {
    // console.log("prev:", accumulator, "current:", current);

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
          {count && count[ingredient._id] && <Counter count={count[ingredient._id]} size="default" extraClass="m-1"/> }
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

// IngredientItem.propTypes = {
//   openModal: PropTypes.func.isRequired,
//   image: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   iid: PropTypes.string.isRequired,
//   count: PropTypes.number.isRequired,
// }