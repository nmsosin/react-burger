import React, {FC} from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyles from './ingredient-item.module.css';
import {useDrag} from "react-dnd";
import {NavLink, useLocation} from "react-router-dom";
import {getConstructorIngredients} from "../../utils/constants";
import {TIngredient} from "../../utils/types";
import {useAppSelector} from "../../services/hooks/hooks";


type TIngredientItem = {
  ingredient: TIngredient;
  iid?: string;
  openModalHandler: () => void;
}

const IngredientItem: FC<TIngredientItem> = ({ ingredient, openModalHandler }) => {
  const { optionalIngredients, bun } = useAppSelector(getConstructorIngredients);

  const location = useLocation();

  const count = ingredient.type !== "bun"
    ? optionalIngredients.reduce((accumulator: { [key: string]: number }, current) => {
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