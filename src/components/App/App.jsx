import { useState,  useEffect } from 'react';
import AppHeader from "../app-header/app-header";
import generalStyles from "./App.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { IngredientContext, OrderTotalContext} from "../../utils/userContext";
import { getIngredientsData } from "../../services/actions/ingredientsList";
import {useDispatch, useSelector} from "react-redux";

const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  // const [items, setItems] = useState(null);
  // const [isOrderModalOpen, setIsOrderModalOpened] = useState(false);
  // const [isIngredientModalOpen, setIsIngredientModalOpened] = useState(false);
  // const [currentIngredientId, setCurrentIngredientId] = useState(null);
  // const [order, setOrder] = useState(null);

  // const checkResponse = (res) => {
  //   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  // };

  // const getIngredientData = async () => {
  //   try {
  //     setItems(null);
  //     const res = await fetch(dataUrl);
  //     const result = await checkResponse(res);
  //     setItems(result.data);
  //   } catch (err) {
  //     alert(`Ой! При запросе данных произошла ошибка: ${err}`);
  //   }
  // }

  const ingredientsList = useSelector(store => store.ingredients.ingredients);
  // const ingredientsList = true;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(ingredientsList)
    dispatch(getIngredientsData(dataUrl))
  }, [dispatch]);

  // TODO: move to actions
  // const getCurrentIngredientId = (identifier) => {
  //   console.log(identifier);
  //   setCurrentIngredientId(identifier);
  // };
  //
  // const openOrderModal = () => {
  //   setIsOrderModalOpened(true);
  //   setOrder(null);
  // }
  //
  // const openIngredientModal = () => {
  //   setIsIngredientModalOpened(true);
  // }
  //
  // const closeModal = () => {
  //   setIsOrderModalOpened(false);
  //   setIsIngredientModalOpened(false);
  // }
  //
  // const handleCloseButton = () => {
  //   closeModal();
  // }

  return (
    <>
      <AppHeader />
      { ingredientsList && (
        <main className={generalStyles.content}>

              <>
                <BurgerIngredients  />
                {/*<BurgerConstructor />*/}
              </>
        </main>)
      }
      {/*{*/}
      {/*  isOrderModalOpen &&*/}
      {/*    <Modal children={<OrderDetails orderNumber={order} />} content={items} currentIngredientId={currentIngredientId} />*/}
      {/*}*/}

      {/*{*/}
      {/*  isIngredientModalOpen &&*/}
      {/*    <Modal children={<IngredientDetails items={items} iid={currentIngredientId} />} content={items}  />*/}
      {/*}*/}
    </>
  );
}

export default App;
