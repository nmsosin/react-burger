export const getCurrentIngredient = (store) => store.currentIngredient;
export const getUserAuth = (store) => store.user.isAuthChecked;
export const getUserInfo = (store) => store.user.user;
export const getConstructorIngredients = (store) => ({
  optionalIngredients: store.constructorIngredients.optionalIngredients,
  bun: store.constructorIngredients.bun
});

export const getOrderDetails = (store) => ({
  orderNumber: store.order.orderNumber,
  isOrderModalOpen: store.order.isOrderModalOpen
})

export const getIngredientsList = (store) => store.ingredientsList.ingredients;


