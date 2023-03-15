import React from 'react';
import PropTypes from "prop-types";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyles from './ingredient-item.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {OPEN_CURRENT_INGREDIENT, CLOSE_CURRENT_INGREDIENT} from "../../services/actions/currentIngredient";

const IngredientItem= ({ ingredient }) => {
  const { currentIngredient, isIngredientModalOpen } = useSelector(store => store.currentIngredient)
  const constructorIngredientsStore = useSelector(store => store.constructorIngredients.constructorIngredients);
  const dispatch = useDispatch();

  const count = constructorIngredientsStore.reduce((accumulator, current) => {
    // console.log("prev:", accumulator, "current:", current);

    if (accumulator[current._id] !== undefined) {
      accumulator[current._id] += 1;
    } else {
      accumulator[current._id] = 1;
    }

    return accumulator;
  }, {});




    // Adding DnD feature
  const [{ isDragging}, dragRef] = useDrag({
    type: 'ingredients',
    item: { ...ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  // console.log(isDragging);


    const handleIngredientCardClick = () => {
      dispatch({ type: OPEN_CURRENT_INGREDIENT, payload: ingredient })
    // getCurrentIngredientId(iid);
    // openModal();
  }

    const handleCloseButton = (evt) => {
      evt.stopPropagation();
      dispatch({type: CLOSE_CURRENT_INGREDIENT})
    }

  return (
    <>
      <li ref={dragRef} className={ingredientItemStyles.card} onClick={handleIngredientCardClick} >
        <Counter count={count[ingredient._id]} size="default" extraClass="m-1" />
        <img src={ingredient.image} alt="Ингредиент космического бургера"/>
        <span className={`text text_type_digits-default pt-1 pb-1 ${ingredientItemStyles.price}`}>
          {ingredient.price}
          <CurrencyIcon type={"primary"} />
        </span>
        <p className={`${ingredientItemStyles.ingredientName}`}>{ingredient.name}</p>
      </li>


    {
      isIngredientModalOpen &&
      <Modal children={<IngredientDetails />} onClose={handleCloseButton} />
    }
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