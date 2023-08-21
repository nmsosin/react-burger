import {TStore} from "../services/reducers";

export const getCurrentIngredient = (store: TStore) => store.currentIngredient;
export const getOrdersList = (store: TStore) => store.orderInfo.orders;
export const getCurrentOrderDetails = (store: TStore) => ({
  orders: store.orderInfo.orders,
  isOrderModalOpen: store.orderInfo.isOrderModalOpen,
  currentOrder: store.orderInfo.currentOrder
});

export const getUserAuth = (store: TStore) => store.user.isAuthChecked;
export const getUserInfo = (store: TStore) => store.user.user;
export const getConstructorIngredients = (store: TStore) => ({
  optionalIngredients: store.constructorIngredients.optionalIngredients,
  bun: store.constructorIngredients.bun
});

export const getSentOrderDetails = (store: TStore) => ({
  orderNumber: store.order.orderNumber,
  isSentOrderModalOpen: store.order.isSentOrderModalOpen
})

export const sentOrders = (store: TStore) => store.order;

export const getIngredientsList = (store: TStore) => store.ingredientsList.ingredients;

export const getWsOrders = (store: TStore) => store.wsOrdersFeed;
export const getWsAuthOrders = (store: TStore) => store.wsAuthOrdersFeed;


export const BASE_URL: 'https://norma.nomoreparties.space/api' = 'https://norma.nomoreparties.space/api';
export const SOCKET_URL: 'wss://norma.nomoreparties.space' = 'wss://norma.nomoreparties.space';