
import { ingredientsListReducer } from './ingredientsList';
import { combineReducers } from 'redux';
// import { burgerConstructorReducer } from './constructor';
// import { currentIngredientReducer } from './currentIngredient';
// import { orderReducer } from './order';


export const rootReducer = combineReducers({
  ingredients: ingredientsListReducer,
  // constructor: burgerConstructorReducer,
  // currentIngredient: currentIngredientReducer,
  // order: orderReducer,
});