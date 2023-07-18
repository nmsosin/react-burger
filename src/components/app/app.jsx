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
import {ProfilePage} from "../../pages/profile/profile";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password";
import {IngredientPage} from "../../pages/ingredient";
import {RegisterPage} from "../../pages/register/register";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password";
import {OrdersHistoryPage} from "../../pages/orders-history";
import {OnlyAuth, OnlyUnAuth} from "../protected-route/protected-route";
import {checkUserAuth, getUserInfo} from "../../services/actions/user";
import {getCookie} from "../../utils/cookie";
import {OrdersFeedPage} from "../../pages/orders-feed/orders-feed";
import {NotFound404} from "../../pages/not-found-404/not-found-404";

const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  // const ingredientsList = useSelector(store => store.ingredientsList.ingredients);
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const accessToken = getCookie('accessToken')
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsData(dataUrl))
  }, [dispatch]);

  useEffect(() => {
    // dispatch(checkUserAuth());
    if (accessToken) {
      dispatch(getUserInfo())
      console.log('isAuthChecked', isAuthChecked);
      console.log('user', user)
    }
    // console.log('document.cookie', document.cookie)
    // console.log('isAuthChecked', isAuthChecked);
    // console.log('user', user)
  }, [isAuthChecked, accessToken]);

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
          <Route path="/profile/orders/:id" element={<OnlyAuth component={<OrdersFeedPage />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
          <Route path="/*" element={<NotFound404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
