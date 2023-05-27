import { useState,  useEffect } from 'react';
import AppHeader from "../app-header/app-header";
import generalStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { IngredientContext, OrderTotalContext} from "../../utils/userContext";
import { getIngredientsData } from "../../services/actions/ingredientsList";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {MainPage} from "../../pages/main";
import {LoginPage} from "../../pages/login";
import {ProfilePage} from "../../pages/profile";
import {ForgotPasswordPage} from "../../pages/forgot-password";
import {IngredientPage} from "../../pages/ingredient";
import {RegisterPage} from "../../pages/register";
import {ResetPasswordPage} from "../../pages/reset-password";
import {OrdersHistoryPage} from "../../pages/orders-history";

const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const ingredientsList = useSelector(store => store.ingredientsList.ingredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsData(dataUrl))
  }, [dispatch]);

  return (
    <>

      <Router>
        <AppHeader />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/ingredient" element={<IngredientPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/orders" element={<OrdersHistoryPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
