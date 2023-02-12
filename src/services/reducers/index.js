
import { ingredientsListReducer } from './ingredientsList'
import { combineReducers } from 'redux';
// import { burgerConstructorReducer } from './constructor'


export const rootReducer = combineReducers({
  ingredients: ingredientsListReducer,
  // constructor: burgerConstructorReducer,
  // currentIngredient: currentIngredientReducer,
  // order: orderReducer,
});