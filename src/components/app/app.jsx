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
import {LoginPage} from "../../pages/login/login";
import {ProfilePage} from "../../pages/profile";
import {ForgotPasswordPage} from "../../pages/forgot-password";
import {IngredientPage} from "../../pages/ingredient";
import {RegisterPage} from "../../pages/register/register";
import {ResetPasswordPage} from "../../pages/reset-password";
import {OrdersHistoryPage} from "../../pages/orders-history";
import {OnlyAuth, OnlyUnAuth} from "../protected-route/protected-route";
import {checkUserAuth} from "../../services/actions/user";

const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  // const ingredientsList = useSelector(store => store.ingredientsList.ingredients);
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsData(dataUrl))
  }, [dispatch]);

  useEffect(() => {
    // dispatch(checkUserAuth());
    console.log('document.cookie', document.cookie)
    console.log('isAuthChecked', isAuthChecked);
    console.log('user', user)
  }, []);

  return (
    <>

      <Router>
        <AppHeader />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
          <Route path="/ingredient" element={<IngredientPage />} />
          <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path="/profile/orders" element={<OnlyAuth component={<OrdersHistoryPage />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
