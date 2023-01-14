import {React, useState,  useEffect } from 'react';
import './App.module.css';
import AppHeader from "../app-header/app-header";
import generalStyles from "../../index.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import dataJS from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ModalOverlay from "../modal-overlay/modal-overlay";

const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [item, setItem] = useState();

  useEffect(() => {
    const getIngredientData = async () => {
      setItem();
      const res = await fetch(dataUrl);
      const result = await res.json();
      setItem(result.data);
    }

    getIngredientData();
  }, []);

  return (

    <>
      <AppHeader />
      <main className={generalStyles.content}>
        {
          item &&
          <>
            <BurgerIngredients content={item} />
            <BurgerConstructor content={item} />
          </>
        }
      </main>
      <ModalOverlay />
    </>
  );
}

export default App;
