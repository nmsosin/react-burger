import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from "../ingredient-item/ingredient-item";

import BurgerIngredientsStyles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import checkPropTypes from "../../utils/prop-types";

const BurgerIngredients = ({ openModal, content, getCurrentIngredientId }) => {
  const [current, setCurrent] = React.useState('buns');

  return (
    <section>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={BurgerIngredientsStyles.ingredientTypesList}>
        <li>
          <h2 id={"buns"} className={"text text_type_main-medium pt-10 pb-6"}>Булки</h2>
          <ul className={BurgerIngredientsStyles.ingredientItemsList}>
            {content.filter(el => el.type === 'bun').map((el) => <IngredientItem key={el._id} iid={el._id} name={el.name} price={el.price} image={el.image} openModal={openModal} getCurrentIngredientId={getCurrentIngredientId} />)}
          </ul>
        </li>

        <li>
          <h2 id={"sauces"} className={"text text_type_main-medium pt-10 pb-6"}>Соусы</h2>
          <ul className={BurgerIngredientsStyles.ingredientItemsList}>
            {content.filter(el => el.type === 'sauce').map((el) => <IngredientItem key={el._id} iid={el._id} name={el.name} price={el.price} image={el.image} openModal={openModal} getCurrentIngredientId={getCurrentIngredientId} />)}
          </ul>
        </li>

        <li>
          <h2 id={"fillings"} className={"text text_type_main-medium pt-10 pb-6"}>Начинки</h2>
          <ul className={BurgerIngredientsStyles.ingredientItemsList}>
            {content.filter(el => el.type === 'main').map((el) => <IngredientItem key={el._id} iid={el._id} name={el.name} price={el.price} image={el.image} openModal={openModal} getCurrentIngredientId={getCurrentIngredientId} />)}
          </ul>
        </li>
      </ul>
    </section>
  )
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  content: PropTypes.arrayOf(checkPropTypes),
  openModal: PropTypes.func
}