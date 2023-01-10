import React from 'react';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
// import { data } from '../../utils/data';

const IngredientsItem= (props) => {
  return (
      <div style={{ display: 'flex' }}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="Ингредиент космического бургера"/>
        <span>
          500
          <CurrencyIcon />
        </span>
        <p>Краторная булка N-200i</p>
      </div>
  )
}

export default IngredientsItem;