import {React, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from "../ingredient-item/ingredient-item";
import {useDispatch, useSelector} from "react-redux";
import { useInView } from 'react-intersection-observer';

import BurgerIngredientsStyles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import checkPropTypes from "../../utils/prop-types";
import {getIngredientsData} from "../../services/actions/ingredientsList";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('buns');

  const ingredients = useSelector(store => store.ingredientsList.ingredients);

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


  // Tab highlight feature for ingredients list scrolling
  const [bunInViewRef, inViewBuns] = useInView();
  const [sauceInViewRef, inViewSauces] = useInView();
  const [fillingInViewRef, inViewFillings] = useInView();

  useEffect(() => {
      if (inViewBuns) {
        setCurrent('buns');
      } else if (inViewSauces) {
        setCurrent('sauces');
      } else if (inViewFillings) {
        setCurrent('fillings')
      }
  }, [inViewBuns, inViewSauces,inViewFillings]);



  // Assigning multiple refs for ingredient types navigation
  const bunRef = useRef();
  const sauceRef = useRef();
  const fillingRef = useRef();


  const setBunRefs = useCallback((node) => {
      bunRef.current = node;
      bunInViewRef(node);
    },
    [bunInViewRef],
  );

  const setSauceRefs = useCallback((node) => {
      sauceRef.current = node;
      sauceInViewRef(node);
    },
    [sauceInViewRef],
  );

  const setFillingRefs = useCallback((node) => {
      fillingRef.current = node;
      fillingInViewRef(node);
    },
    [fillingInViewRef],
  );

  const handleTabClick = (ref) => {
    setCurrent(ref);
    switch (ref) {
      case 'buns':
        bunRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
        break;
      case 'sauces':
        sauceRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
        break;
      case 'fillings':
        fillingRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
        break;
    }

  }


  return (
    <section>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="buns" active={current === 'buns'} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab value="fillings" active={current === 'fillings'} onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
      <ul id={"ingredientsListSection"} className={BurgerIngredientsStyles.ingredientTypesList}>
        <li>
          <h2 id={"buns"} ref={setBunRefs} className={"text text_type_main-medium pt-10 pb-6"}>Булки</h2>
          <ul className={BurgerIngredientsStyles.ingredientItemsList}>
            {buns.map((el) => <IngredientItem ingredient={el} key={el._id} iid={el._id} />)}
          </ul>
        </li>

        <li>
          <h2 id={"sauces"} ref={setSauceRefs} className={"text text_type_main-medium pt-10 pb-6"}>Соусы</h2>
          <ul className={BurgerIngredientsStyles.ingredientItemsList}>
            {sauces.map((el) => <IngredientItem ingredient={el} key={el._id} iid={el._id} />)}
          </ul>
        </li>

        <li>
          <h2 id={"fillings"} ref={setFillingRefs} className={"text text_type_main-medium pt-10 pb-6"}>Начинки</h2>
          <ul className={BurgerIngredientsStyles.ingredientItemsList}>
            {fillings.map((el) => <IngredientItem ingredient={el} key={el._id} iid={el._id} />)}
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