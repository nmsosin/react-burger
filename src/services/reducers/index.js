
import { ingredientsListReducer } from './ingredientsList';
import { combineReducers } from 'redux';
import { constructorIngredientsReducer } from './constructorIngredients';
import { currentIngredientReducer } from './currentIngredient';
import { orderReducer } from './order';


export const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  constructorIngredients: constructorIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});