import {React, useState,  useEffect } from 'react';
import AppHeader from "../app-header/app-header";
import generalStyles from "./App.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [items, setItems] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpened] = useState(false);
  const [isIngredientModalOpen, setIsIngredientModalOpened] = useState(false);
  const [currentIngredientId, setCurrentIngredientId] = useState(null);

  const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  const getIngredientData = async () => {
    try {
      setItems(null);
      const res = await fetch(dataUrl);
      const result = await checkResponse(res);
      setItems(result.data);
    } catch (err) {
      alert(`Ой! При запросе данных произошла ошибка: ${err}`);
    }
  }

  useEffect(() => {
     getIngredientData();
  }, []);


  const getCurrentIngredientId = (identifier) => {
    console.log(identifier);
    setCurrentIngredientId(identifier);
  };

  const openOrderModal = () => {
    setIsOrderModalOpened(true);
  }

  const openIngredientModal = () => {
    setIsIngredientModalOpened(true);
  }

  const closeModal = () => {
    setIsOrderModalOpened(false);
    setIsIngredientModalOpened(false);
  }

  const handleCloseButton = () => {
    closeModal();
  }

  return (
    <>
      <AppHeader />
      <main className={generalStyles.content}>
        {
          items &&
          <>
            <BurgerIngredients content={items} openModal={openIngredientModal} closeModal={closeModal} isOpen={isIngredientModalOpen} getCurrentIngredientId={getCurrentIngredientId} />
            <BurgerConstructor content={items} openModal={openOrderModal} closeModal={closeModal} isOpen={isIngredientModalOpen} />
          </>
        }
      </main>

      {
        isOrderModalOpen &&
          <Modal children={<OrderDetails />} onClose={handleCloseButton} content={items} closeModal={closeModal} currentIngredientId={currentIngredientId}/>
      }

      {
        isIngredientModalOpen &&
          <Modal children={<IngredientDetails items={items} iid={currentIngredientId} />} onClose={handleCloseButton} content={items} closeModal={closeModal} />
      }
    </>
  );
}

export default App;
