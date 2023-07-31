export const getCurrentIngredient = (store) => store.currentIngredient;
export const getOrdersList = (store) => store.orderInfo.orders;
export const getCurrentOrderDetails = (store) => ({
  orders: store.orderInfo.orders,
  isOrderModalOpen: store.orderInfo.isOrderModalOpen
});

export const getUserAuth = (store) => store.user.isAuthChecked;
export const getUserInfo = (store) => store.user.user;
export const getConstructorIngredients = (store) => ({
  optionalIngredients: store.constructorIngredients.optionalIngredients,
  bun: store.constructorIngredients.bun
});

export const getSentOrderDetails = (store) => ({
  orderNumber: store.order.orderNumber,
  isSentOrderModalOpen: store.order.isSentOrderModalOpen
})

export const sentOrders = (store) => store.order;

export const getIngredientsList = (store) => store.ingredientsList.ingredients;

export const getWsOrders = (store) => store.wsOrdersFeed;
