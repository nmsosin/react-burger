import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from "../ingredient-item/ingredient-item";


const BurgerIngredients= (props) => {
  const [current, setCurrent] = React.useState('buns');
  return (
    <section>
      <h1>Соберите бургер</h1>
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
      <div>
        <h2 id={"buns"}>Булки</h2>
          <IngredientItem />
        <h2 id={"sauces"}>Соусы</h2>
          <IngredientItem />
        <h2 id={"fillings"}>Начинки</h2>
          <IngredientItem />
      </div>
    </section>
  )
}

export default BurgerIngredients;