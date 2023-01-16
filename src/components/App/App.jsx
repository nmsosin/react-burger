import {React, useState,  useEffect } from 'react';
import './App.module.css';
import AppHeader from "../app-header/app-header";
import generalStyles from "./App.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import dataJS from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ModalOverlay from "../modal-overlay/modal-overlay";

const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [item, setItem] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpened] = useState(false);
  const [isIngredientModalOpen, setIsIngredientModalOpened] = useState(false);
  const [currentIngredientId, setCurrentIngredientId] = useState(null);

  const getIngredientData = async () => {
    try {
      setItem();
      const res = await fetch(dataUrl);
      const result = await res.json();
      setItem(result.data);
    } catch (err) {
      console.log(`Ой! При запросе данных произошла ошибка: ${err}`);
    }
  }

  useEffect(() => {
     getIngredientData();
  }, []);


  const getCurrentIngredientId = (evt) => {
    console.log(evt.currentTarget._id);
    setCurrentIngredientId(evt.currentTarget._id)
  };

  const openOrderModal = () => {
    setIsOrderModalOpened(true);
  }

  const openIngredientModal = () => {
    setIsIngredientModalOpened(true);
  }

  const closeModal = (evt) => {
    evt.preventDefault();
    setIsOrderModalOpened(false);
    setIsIngredientModalOpened(false);
  }

  return (

    <>
      <AppHeader />
      <main className={generalStyles.content}>
        {
          item &&
          <>
            <BurgerIngredients content={item} openModal={openIngredientModal} closeModal={closeModal} isOpen={isIngredientModalOpen} getCurrentIngredientId={getCurrentIngredientId} />
            <BurgerConstructor content={item} openModal={openOrderModal} closeModal={closeModal} isOpen={isIngredientModalOpen} />
          </>
        }
      </main>
      <ModalOverlay content={item} closeModal={closeModal} orderModalOpened={isOrderModalOpen} ingredientModalOpened={isIngredientModalOpen} currentIngredientId={currentIngredientId} />
    </>
  );
}

export default App;
