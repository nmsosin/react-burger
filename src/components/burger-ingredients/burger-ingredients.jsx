import {React, useEffect, useMemo, useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from "../ingredient-item/ingredient-item";
import {useDispatch, useSelector} from "react-redux";

import BurgerIngredientsStyles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import checkPropTypes from "../../utils/prop-types";
import {getIngredientsData} from "../../services/actions/ingredientsList";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('buns');
  const ingredients = useSelector(store => store.ingredientsList.ingredients);


  useEffect(() => {
    console.log(ingredients)
  }, [])

  const buns = useMemo(
    () => ingredients.filter(item => item['type'] === 'bun'),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter(item => item['type'] === 'sauce'),
    [ingredients]
  );

  const fillings = useMemo(
    () => ingredients.filter(item => item['type'] === 'main'),
    [ingredients]
  );

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
            {buns.map((el) => <IngredientItem ingredient={el} key={el._id} iid={el._id} count={1} />)}
          </ul>
        </li>

        <li>
          <h2 id={"sauces"} className={"text text_type_main-medium pt-10 pb-6"}>Соусы</h2>
          <ul className={BurgerIngredientsStyles.ingredientItemsList}>
            {sauces.map((el) => <IngredientItem ingredient={el} key={el._id} iid={el._id} count={0} />)}
          </ul>
        </li>

        <li>
          <h2 id={"fillings"} className={"text text_type_main-medium pt-10 pb-6"}>Начинки</h2>
          <ul className={BurgerIngredientsStyles.ingredientItemsList}>
            {fillings.map((el) => <IngredientItem ingredient={el} key={el._id} iid={el._id} count={2} />)}
          </ul>
        </li>
      </ul>
    </section>
  )
}

export default BurgerIngredients;

// BurgerIngredients.propTypes = {
//   content: PropTypes.arrayOf(checkPropTypes),
//   openModal: PropTypes.func.isRequired
// }