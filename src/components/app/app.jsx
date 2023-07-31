import React, { useEffect } from 'react';
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getIngredientsData } from "../../services/actions/ingredientsList";
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {MainPage} from "../../pages/main";
import {LoginPage} from "../../pages/login/login";
import {ProfilePage} from "../../pages/profile/profile";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password";
import {RegisterPage} from "../../pages/register/register";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password";
import {OrdersHistoryPage} from "../../pages/orders-history/orders-history";
import {OnlyAuth, OnlyUnAuth} from "../protected-route/protected-route";
import {getUserInfo, refreshUserToken} from "../../services/actions/user";
import {getCookie} from "../../utils/cookie";
import {OrdersFeedPage} from "../../pages/orders-feed/orders-feed";
import {NotFound404} from "../../pages/not-found-404/not-found-404";
import {CLOSE_CURRENT_INGREDIENT, OPEN_CURRENT_INGREDIENT} from "../../services/actions/currentIngredient";
import {
  getCurrentIngredient,
  getOrdersList,
  getUserAuth, getCurrentOrderDetails,
} from "../../utils/constants";
import {
  GENERAL_ROUTE,
  MAIN_PAGE_ROUTE,
  INGREDIENT_DETAILS_ROUTE,
  REGISTER_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  ORDERS_FEED_PAGE_ROUTE,
  ORDERS_HISTORY_PAGE_ROUTE,
  FORGOT_PASSWORD_PAGE_ROUTE,
  RESET_PASSWORD_PAGE_ROUTE, ORDERS_FEED_DETAILS_PAGE_ROUTE, ORDERS_HISTORY_DETAILS_PAGE_ROUTE
} from "../../utils/routes";
import {OrdersFeedDetails} from "../order-feed-details/orders-feed-details";
import {RESET_CURRENT_ORDER, getOrders} from "../../services/actions/orderInfo";

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const isAuthChecked = useSelector(getUserAuth);
  const { currentIngredient, isIngredientModalOpen } = useSelector(getCurrentIngredient);
  const {orders, isOrderModalOpen} = useSelector(getCurrentOrderDetails);
  const accessToken = getCookie('accessToken');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsData())
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getOrders());
  // }, [dispatch])

  // console.log('orders', orders);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserInfo())
    } else {
      refreshUserToken();
    }
  }, [isAuthChecked, accessToken]);

  useEffect(() => {
    dispatch({ type: OPEN_CURRENT_INGREDIENT, payload: currentIngredient })
  }, [])

  const handleIngredientCloseButton = () => {
    dispatch({type: CLOSE_CURRENT_INGREDIENT})
    navigate(-1)
  }

  const handleOrderCloseButton = () => {
    dispatch({type: RESET_CURRENT_ORDER})
    navigate(-1)
  }

  return (
    <>
      <AppHeader />

      <Routes location={ background || location }>
        <Route path={MAIN_PAGE_ROUTE} element={<MainPage />} />
        <Route path={FORGOT_PASSWORD_PAGE_ROUTE} element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path={LOGIN_PAGE_ROUTE} element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path={PROFILE_PAGE_ROUTE} element={<OnlyAuth component={<ProfilePage />} />} />
        <Route path={ORDERS_HISTORY_PAGE_ROUTE} element={<OnlyAuth component={<OrdersHistoryPage />} />} />
        {/*<Route path={ORDERS_HISTORY_DETAILS_PAGE_ROUTE} element={<OrdersFeedDetails order={currentOrder} />} />*/}
        <Route path={ORDERS_FEED_PAGE_ROUTE} element={<OrdersFeedPage />} />
        <Route path={ORDERS_FEED_DETAILS_PAGE_ROUTE} element={<OrdersFeedDetails />} />
        <Route path={ORDERS_HISTORY_DETAILS_PAGE_ROUTE} element={<OrdersFeedDetails />} />
        <Route path={INGREDIENT_DETAILS_ROUTE} element={
            <IngredientDetails isSeparateTab={true} />
        } />
        <Route path={REGISTER_PAGE_ROUTE} element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path={RESET_PASSWORD_PAGE_ROUTE} element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path={GENERAL_ROUTE} element={<NotFound404 />} />
      </Routes>

      { background && (
        <Routes>
          <Route path={INGREDIENT_DETAILS_ROUTE} element={
            isIngredientModalOpen && <Modal children={<IngredientDetails isSeparateTab={false} />} onClose={handleIngredientCloseButton} />
          } />
        </Routes>
      )}

      { background && (
        <Routes>
          <Route path={ORDERS_FEED_DETAILS_PAGE_ROUTE} element={
            isOrderModalOpen && <Modal children={<OrdersFeedDetails />} onClose={handleOrderCloseButton} />
          } />
        </Routes>
      )}

      { background && (
        <Routes>
          <Route path={ORDERS_HISTORY_DETAILS_PAGE_ROUTE} element={
            isOrderModalOpen && <Modal children={<OrdersFeedDetails />} onClose={handleOrderCloseButton} />
          } />
        </Routes>
      )}

    </>
  );
}

export default App;
